import {
	CommentDto,
	CommentType,
	UpdateCommentDto,
} from '@/shared/interfaces/comment.interface';
import { AuthApiClient, apiClient } from 'api/axiosInstance';

export const CommentService = {
	async getComments(postId: string): Promise<CommentType[]> {
		const { data } = await AuthApiClient.get<CommentType[]>(
			`/posts/${postId}/comments`,
		);
		return data;
	},

	async createComment(body: CommentDto, postId: string): Promise<void> {
		const { data } = await AuthApiClient.post<void>(
			`/posts/${postId}/comments`,
			body,
		);
		return data;
	},

	async deleteComment(commentId: string, postId: string): Promise<void> {
		const { data } = await AuthApiClient.delete<void>(
			`/posts/${postId}/comments/${commentId}`,
		);
		return data;
	},

	async updateComment(body: UpdateCommentDto, postId: string): Promise<void> {
		const { data } = await AuthApiClient.put<void>(
			`/posts/${postId}/comments/${body.commentId}`,
			body,
		);
		return data;
	},
};
