import Format from '@/components/ui/layout/format';
import React, { FC, FormEvent } from 'react';
import styles from './Sinup.module.scss';
import Button from '@/components/ui/button/Button';
import { UserData } from '@/shared/interfaces/user';
import { useMutation } from 'react-query';
import { register } from 'api/userService';
import ToastMessage from '@/components/toast';
import axios from 'axios';

const Signup: FC = () => {
	const [inputs, setInputs] = React.useState<UserData>({
		email: '',
		name: '',
		password: '',
	});

	const { email, name, password } = inputs;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		setInputs({
			...inputs,
			[name]: value,
		});
	};

	const registerMutation = useMutation(
		['register'],
		(data: UserData) => register(data),
		{
			onSuccess: data => {
				console.log(data);
			},
			onError: error => {
				if (axios.isAxiosError(error)) {
					notify('error', error.response?.data.message);
				} else {
					console.error(error);
				}
			},
		},
	);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		console.log('email', email);
		console.log('name', name);
		console.log('password', password);
		registerMutation.mutate({ email, password, name });
	};

	interface toastFunc {
		(type: 'success' | 'error' | 'info' | 'warning', message: string): void;
	}

	const notify: toastFunc = React.useCallback((type, message) => {
		ToastMessage({ type, message });
	}, []);

	return (
		<Format title="회원가입">
			<form onSubmit={handleSubmit}>
				<div className={styles.register_container}>
					<div className={styles.register_form_title_wrap}>
						<div className={styles.register_form_title}>Blog</div>
						<div className={styles.register_form_subtitle}>project</div>
					</div>
					<div className={styles.register_form_subject}>SignUp</div>
					<div className={styles.register_description}>
						Signup with the entered data.
					</div>
					<div className={styles.register_wrap}>
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
					<div className={styles.register_wrap}>
						<label>이름</label>
						<input
							className="border-solid border border-black"
							name="name"
							type="text"
							onChange={handleChange}
							value={name}
							placeholder="name@example.com"
						></input>
					</div>
					<div className={styles.register_wrap}>
						<label>Password</label>
						<input
							className="border-solid border border-black"
							name="password"
							type="text"
							onChange={handleChange}
							value={password}
							placeholder="name@example.com"
						></input>
					</div>
					<div className={styles.register_btn_wrap}>
						<Button
							type="submit"
							className="bg-primary w-full text-white text-2xl px-3 py-2 font-medium rounded-lg"
						>
							SignUp
						</Button>
					</div>
				</div>
			</form>
		</Format>
	);
};

export default Signup;
