export interface CommentType {
	id: string;
	comment_content: string;
	parentId?: string | null;
	userId: string;
	replyId?: string | null;
	replyUserName?: string;
	writer?: string;
	likes: number;
	parentUserName?: string;
	updatedAt: string;
	children_comments?: CommentType[];
}

export interface CommentDto
	extends Pick<CommentType, 'comment_content' | 'parentId' | 'replyId'> {
	postId: string;
}

export interface UpdateCommentDto extends Pick<CommentType, 'comment_content'> {
	commentId?: string;
}
