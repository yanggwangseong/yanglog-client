import { HomePostType } from '@/shared/interfaces/home.interface';
import { apiClient } from 'api/axiosInstance';

export const HomeService = {
	async getMainPosts(): Promise<HomePostType> {
		const { data } = await apiClient.get<HomePostType>(`posts/main`);
		return data;
	},
};
