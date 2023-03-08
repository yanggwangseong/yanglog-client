import Link from 'next/link';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginAtom, resetOptionsLoginAtom } from '../../atoms/loginAtom';
import { useMutation } from 'react-query';
import { logoutUser } from '../../api/userService';
import { removeToStorage } from '../../api/axiosInstance';
import Spinner from '@/components/_child/spinner';

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
					<a className="text-xl font-semibold">LOGO</a>
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
	const [isLoading, setIsLoading] = useState(true);

	const logoutMutation = useMutation(() => logoutUser(), {
		onMutate: variable => {},
		onSuccess: data => {
			removeToStorage('accessToken');
			SetLoginState(resetOptionsLoginAtom);
		},
		onError: error => {
			console.log(error);
		},
	});

	const handleLogout = () => {
		logoutMutation.mutate();
	};

	useEffect(() => {
		setIsLoading(false);
	}, []);

	if (isLoading) {
		return <Spinner></Spinner>;
	}

	return (
		<header className="bg-white sticky top-0 z-50 border border-b-gray-200">
			<MobileNav open={open} setOpen={setOpen} />
			<div className="xl:container xl:mx-auto flex items-center flex-row justify-between text-center py-4 px-4 md:px-0">
				<div className="hidden md:flex md:w-96 order1 justify-center py-4 sm:py-0">
					<input type="text" className="input-text" placeholder="Search..." />
				</div>
				<div className="shrink md:w-80 w-3/12 order-2 md:order1 flex items-center md:block">
					<Link href={'/'}>
						<a className="font-bold uppercase text-5xl text-black">YangLog</a>
					</Link>
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
								open ? 'bg-black' : 'bg-white'
							} rounded-lg transform transition duration-300 ease-in-out ${
								open ? 'rotate-45 translate-y-3.5' : ''
							}`}
						/>
						<span
							className={`h-1 w-full ${
								open ? 'bg-black' : 'bg-white'
							} rounded-lg transition-all duration-300 ease-in-out ${
								open ? 'w-0' : 'w-full'
							}`}
						/>
						<span
							className={`h-1 w-full ${
								open ? 'bg-black' : 'bg-white'
							} rounded-lg transform transition duration-300 ease-in-out ${
								open ? '-rotate-45 -translate-y-3.5' : ''
							}`}
						/>
					</div>
				</div>
				<div className="hidden md:flex md:w-96 order-3 justify-center ">
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
								<Link href={'/posts/new'}>
									<a className="text-black">글쓰기</a>
								</Link>
								<button
									type="button"
									className="text-black"
									onClick={() => handleLogout()}
								>
									로그아웃
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
