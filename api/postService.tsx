import axios from 'axios';
import { Post } from '../interfaces/post';

export const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		'Content-type': 'application/json',
	},
	transformResponse: [
		data => {
			return JSON.parse(data);
		},
	],
});

export const getPostAll = async () => {
	const { data } = await apiClient.get<Post[]>(`/posts`);
	return data;
};

export const getPostById = async (postId: string | string[] | number) => {
	const { data } = await apiClient.get<Post>(`/posts/${postId}`);
	return data;
};
