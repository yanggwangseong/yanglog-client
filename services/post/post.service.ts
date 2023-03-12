import { PostType } from '@/shared/interfaces/home.interface';
import { AuthApiClient, apiClient } from 'api/axiosInstance';

export const PostService = {
	async getPostById(postId: string): Promise<PostType> {
		const { data } = await AuthApiClient.get<PostType>(`/posts/${postId}`);
		return data;
	},

	async updateLikesPostId(postId: string) {
		const { data } = await AuthApiClient.put<boolean>(`/posts/${postId}/likes`);
		return data;
	},
};
