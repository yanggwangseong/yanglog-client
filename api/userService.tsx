import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { LoginToken, User } from '../shared/interfaces/user';
import {
	AuthApiClient,
	apiClient,
	getFromStorage,
	saveToStorage,
} from './axiosInstance';

export const loginUser = async ({ email, password }: User) => {
	const response = await apiClient.post<LoginToken>(`/users/signin`, {
		email,
		password,
	});

	return response.data;
};

export const logoutUser = async () => {
	apiClient.defaults.headers.common.Authorization = `Bearer ${getFromStorage(
		'accessToken',
	)}`;
	const response = await apiClient.post(`/users/logout`);
};

export const checkUser = async (accessToken: string) => {
	const response = await AuthApiClient.get(`/users/checkUser`);

	return {
		loginState: true,
		email: response.data.email,
		id: response.data.id,
		name: response.data.name,
	};
};
