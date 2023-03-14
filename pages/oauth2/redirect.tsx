import Spinner from '@/components/_child/spinner';
import { AuthApiClient } from 'api/axiosInstance';
import { checkUser } from 'api/userService';
import { loginAtom } from 'atoms/loginAtom';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export interface Param extends ParsedUrlQuery {
	token: string;
}

const RedirectPage: NextPage = () => {
	const router = useRouter();
	const [loginState, setLoginState] = useRecoilState(loginAtom);
	const { token } = router.query as Param;

	const refreshData = async () => {
		const data = await checkUser();
		return data;
	};

	useEffect(() => {
		if (token) {
			AuthApiClient.defaults.headers.common[
				'Authorization'
			] = `Bearer ${token}`;

			const fetchData = async () => {
				const response = await refreshData();
				setLoginState({
					loginState: response.loginState,
					id: response.id,
					name: response.name,
					email: response.email,
				});
				router.push('/', undefined, { shallow: true });
			};
			fetchData();
		}
	}, [token]);

	return (
		<div>
			<Spinner></Spinner>
		</div>
	);
};

export default RedirectPage;
