import { CommentType } from '@/shared/interfaces/comment.interface';
import { AuthApiClient } from 'api/axiosInstance';

export const CommentService = {
	async getComments(postId: string) {
		const { data } = await AuthApiClient.get<CommentType[]>(
			`/comments/${postId}`,
		);
		return data;
	},
};
