import { CommentType } from '@/shared/interfaces/comment.interface';
import { FormEvent } from 'react';
import { CommentFormState } from '../comment.interface';

export interface CommentItemProps {
	comment: CommentType;
	depth: number;
	replyContent: string;
	openFormId: CommentFormState;
	onToggle: (commentId: string, formType: 'reply' | 'edit') => void;
	onReplySubmit: (
		e: FormEvent,
		type: string,
		commentId: string,
		parentId?: string | null,
	) => void;
	onReplyContentChange: (content: string) => void;
	onCommentDelete: (commentId: string) => void;
}
