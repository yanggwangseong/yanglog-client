export interface CommentType {
	id: string;
	comment_content: string;
	parentId?: string;
	userId: string;
	replyId: string;
	replyUserName?: string;
	writer?: string;
	parentUserName?: string;
	updatedAt: string;
	children_comments?: CommentType[];
}
