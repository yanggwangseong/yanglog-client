export interface CommentType {
	id: string;
	comment_content: string;
	parentId?: string | null;
	userId: string;
	writer?: string;
	replyId?: string | null;
	likes: number;
	mylike?: number;
	replyUserName?: string;
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
