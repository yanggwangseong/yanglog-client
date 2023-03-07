import { CommentDto, CommentType } from '@/shared/interfaces/comment.interface';
import { AuthApiClient, apiClient } from 'api/axiosInstance';

export const CommentService = {
	async getComments(postId: string) {
		const { data } = await apiClient.get<CommentType[]>(`/comments/${postId}`);
		return data;
	},

	async createComment(body: CommentDto) {
		const { data } = await apiClient.post<void>(`/comments`, body);
		return data;
	},
};
