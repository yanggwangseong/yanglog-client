export interface CommentType {
	id: string;
	comment_content: string;
	parentId?: string;
	userId: string;
	parentUserName?: string;
	createdAt: string;
	children_comments?: CommentType[];
}
