import Link from 'next/link';
import Image from 'next/image';
import React, {
	Dispatch,
	FormEvent,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginAtom, resetOptionsLoginAtom } from '../../atoms/loginAtom';
import { useMutation, useQuery } from 'react-query';
import { logoutUser } from '../../api/userService';
import { AuthApiClient, removeToStorage } from '../../api/axiosInstance';
import Spinner from '@/components/_child/spinner';
import styles from './Header.module.scss';
import { FaRegBell } from 'react-icons/fa';
import { IoSearchOutline } from 'react-icons/io5';
import Field from '@/ui/field/Field';
import { useRouter } from 'next/router';
import { useSearch } from '@/hooks/useSearch';
import Notification from '../ui/notification/Notification';
import Error from '@/components/_child/error';
import { NotificationService } from '@/services/notification/notification.service';

interface MobileNavProps {
	setOpen: Dispatch<SetStateAction<boolean>>;
	open: boolean;
}

interface toastFunc {
	(type: 'success' | 'error' | 'info' | 'warning', message: string): void;
}

const MobileNav: React.FunctionComponent<MobileNavProps> = ({
	open,
	setOpen,
}) => {
	return (
		<div
			className={`fixed top-0 left-0 h-screen w-screen z-50 bg-white transform ${
				open ? '-translate-x-0' : '-translate-x-full'
			} transition-transform duration-300 ease-in-out filter drop-shadow-md `}
		>
			<div className="flex items-center justify-center filter drop-shadow-md bg-white h-20">
				<Link href="/">
					<a className="font-bold uppercase text-4xl text-black">YangLog</a>
				</Link>
			</div>
			<div className="flex flex-col ml-4">
				<Link href={'/login'}>
					<a className="text-white">로그인</a>
				</Link>
			</div>
		</div>
	);
};

const Header = () => {
	const [open, setOpen] = useState(false);
	//const data = useRecoilValue(loginAtom);
	const [LoginState, SetLoginState] = useRecoilState(loginAtom);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isNotification, setNotification] = useState<boolean>(false);

	const { handleKeyDown, handleSearch, searchTerm } = useSearch();

	const {
		data,
		isLoading: notificationLoding,
		isError,
	} = useQuery(
		['notifications'],
		async () => await NotificationService.getNotificationAll(),
	);

	const logoutMutation = useMutation(() => logoutUser(), {
		onMutate: variable => {},
		onSuccess: data => {
			//removeToStorage('accessToken');
			AuthApiClient.defaults.headers.common['Authorization'] = '';
			SetLoginState(resetOptionsLoginAtom);
		},
		onError: error => {
			console.log(error);
		},
	});

	const handleLogout = () => {
		logoutMutation.mutate();
	};

	const handleToggleNotification = () => {
		setNotification(!isNotification);
	};

	useEffect(() => {
		setIsLoading(false);
	}, []);

	if (isLoading) {
		return <Spinner></Spinner>;
	}

	if (notificationLoding) {
		return <Spinner></Spinner>;
	}

	if (isError) {
		return <Error></Error>;
	}

	if (!data) {
		return null;
	}

	return (
		<header className="bg-white sticky top-0 z-50 border border-b-gray-200">
			<MobileNav open={open} setOpen={setOpen} />
			<div className="xl:container xl:mx-auto flex items-center flex-row justify-between text-center py-4 px-4 md:px-0 h-20">
				<div className="shrink order-1 md:order1 flex items-center">
					<Link href={'/'}>
						<a className="font-bold uppercase text-4xl text-black">YangLog</a>
					</Link>
					<div className="hidden md:block ml-12">
						{/* <input type="text" className="input-text" placeholder="Search..." /> */}
						<label>
							<Field
								className="rounded-xl px-3 h-10 text-xl w-56"
								placeholder="Search"
								Icon={IoSearchOutline}
								IconSize={18}
								onKeyDown={handleKeyDown}
								onChange={handleSearch}
								value={searchTerm}
								style={{
									backgroundColor: '#edeef2',
								}}
							/>
						</label>
					</div>
				</div>

				<div className="md:hidden w-9/12 order-2 flex justify-end items-center">
					<div
						className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden"
						onClick={() => {
							setOpen(!open);
						}}
					>
						{/* hamburger button */}
						<span
							className={`h-1 w-full ${
								open ? 'bg-black' : 'bg-black'
							} rounded-lg transform transition duration-300 ease-in-out ${
								open ? 'rotate-45 translate-y-3.5' : ''
							}`}
						/>
						<span
							className={`h-1 w-full ${
								open ? 'bg-black' : 'bg-black'
							} rounded-lg transition-all duration-300 ease-in-out ${
								open ? 'w-0' : 'w-full'
							}`}
						/>
						<span
							className={`h-1 w-full ${
								open ? 'bg-black' : 'bg-black'
							} rounded-lg transform transition duration-300 ease-in-out ${
								open ? '-rotate-45 -translate-y-3.5' : ''
							}`}
						/>
					</div>
				</div>
				<div className="hidden md:flex  order-3 justify-center">
					<div className="flex gap-6">
						{LoginState.loginState === false ? (
							<>
								<Link href={'/login'} legacyBehavior>
									<a className="text-black text-3xl">로그인</a>
								</Link>
								<Link href={'/signup'} legacyBehavior>
									<a className="text-black text-3xl">회원가입</a>
								</Link>
							</>
						) : (
							<>
								<Link href={'/'}>
									<div className={styles.header__right_techblog}>TechBlog</div>
								</Link>

								<Link href={'/posts/new'}>
									<div className="flex items-center justify-center text-black cursor-pointer">
										new Post
									</div>
								</Link>

								<button
									type="button"
									className="text-black"
									onClick={() => handleLogout()}
								>
									LogOut
								</button>
								<div
									className={styles.header__right_box}
									onClick={handleToggleNotification}
								>
									<FaRegBell
										className="block"
										size={20}
										color="#4e60ff"
									></FaRegBell>
									<div className={styles.header__right_box_notification}>
										{data.count}
									</div>
								</div>
								{isNotification && (
									<Notification notifications={data.list}></Notification>
								)}
								<Link href={'/mypage'}>
									<div className={styles.header__right_profile}>
										<Image
											className={styles.header__avatar_img}
											src="/images/author/dev-jeans 8.png"
											alt="avatar"
											width={48}
											height={48}
										></Image>
									</div>
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
