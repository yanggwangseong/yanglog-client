import { CommentType } from '@/shared/interfaces/comment.interface';
import { FormEvent } from 'react';

export interface CommentItemProps {
	comment: CommentType;
	depth: number;
	replyContent: string;
	openReplyFormId: string;
	onReplyToggle: (commentId: string) => void;
	onReplySubmit: (e: FormEvent, type: string) => void;
	onReplyContentChange: (content: string) => void;
}
