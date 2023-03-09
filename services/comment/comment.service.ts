import {
	CommentDto,
	CommentType,
	UpdateCommentDto,
} from '@/shared/interfaces/comment.interface';
import { AuthApiClient, apiClient } from 'api/axiosInstance';

export const CommentService = {
	async getComments(postId: string): Promise<CommentType[]> {
		const { data } = await apiClient.get<CommentType[]>(`/comments/${postId}`);
		return data;
	},

	async createComment(body: CommentDto): Promise<void> {
		const { data } = await AuthApiClient.post<void>(`/comments`, body);
		return data;
	},

	async deleteComment(commentId: string): Promise<void> {
		const { data } = await AuthApiClient.delete<void>(`/comments/${commentId}`);
		return data;
	},

	async updateComment(body: UpdateCommentDto): Promise<void> {
		const { data } = await AuthApiClient.put<void>(
			`/comments/${body.commentId}`,
			body,
		);
		return data;
	},
};
