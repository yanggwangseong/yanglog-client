import React, { FC } from 'react';
import styles from './Login.module.scss';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { loginAtom } from 'atoms/loginAtom';
import { LoginToken, User } from '@/shared/interfaces/user';
import ToastMessage from '@/components/toast';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { loginUser } from 'api/userService';
import { saveToStorage } from 'api/axiosInstance';
import Format from '@/components/ui/layout/format';
import Button from '@/components/ui/button/Button';

const Login: FC = () => {
	const router = useRouter();
	const [loginState, setLoginState] = useRecoilState(loginAtom);

	const [inputs, setInputs] = React.useState<User>({
		email: '',
		password: '',
	});

	const { email, password } = inputs;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		setInputs({
			...inputs,
			[name]: value,
		});
	};

	interface toastFunc {
		(type: 'success' | 'error' | 'info' | 'warning', message: string): void;
	}

	const notify: toastFunc = React.useCallback((type, message) => {
		ToastMessage({ type, message });
	}, []);

	const loginMutation = useMutation<LoginToken, AxiosError, User>(
		({ email, password }) => loginUser({ email, password }),
		{
			onMutate: variable => {
				//console.log("onMutate", variable);
				//variable : {loginId: 'xxx', password; 'xxx'}
			},
			onSuccess: data => {
				//console.log("onsuccess",data);
				//if(typeof window !== 'undefined') {
				//    return window.localStorage.setItem("accessToken",data.accessToken);
				//}
				// 로그인 성공 했을때 토큰은 로컬 스토리지에 저장.
				saveToStorage('accessToken', data.accessToken);
				setLoginState({ loginState: true });
				// accessToken으로 해당 회원 조회해서 recoil에 담자.

				router.push('/');
			},
			onError: error => {
				if (error.response?.status === 404) {
					notify('error', '유저가 존재하지 않습니다');
				}
			},
		},
	);

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			email: { value: string };
			password: { value: string };
		};
		const email = target.email.value;
		const password = target.password.value;

		loginMutation.mutate({ email, password });
	};

	return (
		<Format title="회원가입">
			<form onSubmit={handleSubmit}>
				<div className={styles.login_container}>
					<div className={styles.login_form_title_wrap}>
						<div className={styles.login_form_title}>Blog</div>
						<div className={styles.login_form_subtitle}>project</div>
					</div>
					<div className={styles.login_form_subject}>Login</div>
					<div className={styles.login_description}>
						Sign in with your data that you entered during your registration.
					</div>
					<div className={styles.login_email_wrap}>
						<label>Email</label>
						<input
							className="border-solid border border-black"
							name="email"
							type="text"
							onChange={handleChange}
							value={email}
							placeholder="name@example.com"
						></input>
					</div>
					<div className={styles.login_password_wrap}>
						<label>Password</label>
						<input
							className="border-solid border border-black"
							name="password"
							type="text"
							onChange={handleChange}
							value={password}
							placeholder="min. 8 chracters"
						></input>
					</div>
					<div className={styles.login_keep_wrap}>
						<input type="checkbox" />
						<div className={styles.login_keep_text}>로그인 유지</div>
					</div>
					<div className={styles.login_btn_wrap}>
						<Button
							type="submit"
							className="bg-primary w-full text-white text-2xl px-3 py-2 font-medium rounded-lg"
						>
							Login
						</Button>
					</div>
				</div>
			</form>
		</Format>
	);
};

export default Login;
