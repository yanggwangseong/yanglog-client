import { PostType } from '@/shared/interfaces/home.interface';
import { apiClient } from 'api/axiosInstance';

export const PostService = {
	async getPostById(postId: string): Promise<PostType> {
		const { data } = await apiClient.get<PostType>(`/posts/${postId}`);
		return data;
	},
};
