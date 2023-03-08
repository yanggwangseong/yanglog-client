import { CommentDto, CommentType } from '@/shared/interfaces/comment.interface';
import { AuthApiClient, apiClient } from 'api/axiosInstance';

export const CommentService = {
	async getComments(postId: string) {
		const { data } = await apiClient.get<CommentType[]>(`/comments/${postId}`);
		return data;
	},

	async createComment(body: CommentDto) {
		const { data } = await AuthApiClient.post<void>(`/comments`, body);
		return data;
	},

	async deleteComment(commentId: string) {
		const { data } = await AuthApiClient.delete<void>(`/comments/${commentId}`);
		return data;
	},
};
