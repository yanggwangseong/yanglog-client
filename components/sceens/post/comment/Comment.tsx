import React, { FC, FormEvent, useEffect, useState } from 'react';
import styles from './Comment.module.scss';
import {
	CommentDto,
	CommentType,
	UpdateCommentDto,
	UpdateLikesCommentDto,
} from '@/shared/interfaces/comment.interface';
import Image from 'next/image';
import CommentItem from './comment-item/CommentItem';
import Button from '@/components/ui/button/Button';
import { useMutation, useQueryClient } from 'react-query';
import { CommentService } from '@/services/comment/comment.service';
import axios from 'axios';
import ToastMessage from '@/components/toast';
import { useRouter } from 'next/router';
import { CommentFormState } from './comment.interface';
import { ParsedUrlQuery } from 'querystring';

export interface Param extends ParsedUrlQuery {
	postId: string;
}

const Comment: FC<{ comments: CommentType[] }> = ({ comments }) => {
	const [replyContent, setReplyContent] = useState<string>('');
	const [sendContent, setSendContent] = useState<string>('');

	const [openFormId, setOpenFormId] = useState<CommentFormState>({
		replyCommentId: '',
		editCommentId: '',
	});

	const router = useRouter();
	const { postId } = router.query as Param;

	const queryClient = useQueryClient();

	//const postId = '5b1d8ca1-0783-4d19-9905-d5241e3f8e16';

	const handleToggle = (commentId: string, formType: 'reply' | 'edit') => {
		setOpenFormId(prevOpenFormId => {
			if (formType === 'reply') {
				return {
					replyCommentId:
						prevOpenFormId.replyCommentId === commentId ? '' : commentId,
					editCommentId: prevOpenFormId.editCommentId,
				};
			} else if (formType === 'edit') {
				return {
					replyCommentId: prevOpenFormId.replyCommentId,
					editCommentId:
						prevOpenFormId.editCommentId === commentId ? '' : commentId,
				};
			}
			return prevOpenFormId;
		});
	};

	const handleCommentDelete = (commentId: string) => {
		deleteCommentMutation.mutate(commentId);
	};

	const handleReplySubmit = (
		e: FormEvent,
		type: string,
		commentId?: string,
		parentId?: string | null,
	) => {
		e.preventDefault();
		if (type === 'send') {
			const body: CommentDto = {
				comment_content: sendContent,
				parentId: null,
				replyId: null,
				postId: postId,
			};
			createCommentMutation.mutate(body);
			queryClient.invalidateQueries(['comment', postId]);
			setSendContent('');
		} else if (type === 'reply') {
			const body: CommentDto = {
				comment_content: replyContent,
				parentId: parentId,
				replyId: openFormId.replyCommentId,
				postId: postId,
			};
			replyCommentMutation.mutate(body);
			setOpenFormId(prev => {
				prev.replyCommentId = '';
				return prev;
			});
			setReplyContent('');
		} else if (type === 'edit') {
			const body: UpdateCommentDto = {
				commentId: commentId,
				comment_content: replyContent,
			};
			updateCommentMutation.mutate(body);
			setOpenFormId(prev => {
				prev.editCommentId = '';
				return prev;
			});
			setReplyContent('');
		}
	};

	const createCommentMutation = useMutation(
		['createComment'],
		(data: CommentDto) => CommentService.createComment(data, postId),
		{
			onSuccess: data => {
				notify('success', '댓글이 작성 되었습니다.');
			},
			onError: error => {
				if (axios.isAxiosError(error)) {
					notify('error', error.response?.data.message);
				} else {
					console.error(error);
				}
			},
		},
	);

	const replyCommentMutation = useMutation(
		['replyComment'],
		(data: CommentDto) => CommentService.createComment(data, postId),
		{
			onSuccess: data => {
				notify('success', '댓글이 작성 되었습니다.');
				queryClient.invalidateQueries(['comment', postId]);
			},
			onError: error => {
				if (axios.isAxiosError(error)) {
					notify('error', error.response?.data.message);
				} else {
					console.error(error);
				}
			},
		},
	);

	const deleteCommentMutation = useMutation(
		['deleteComment'],
		(commentId: string) => CommentService.deleteComment(commentId, postId),
		{
			onSuccess: data => {
				notify('success', '댓글이 삭제 되었습니다.');
				queryClient.invalidateQueries(['comment', postId]);
			},
			onError: error => {
				if (axios.isAxiosError(error)) {
					notify('error', error.response?.data.message);
				} else {
					console.error(error);
				}
			},
		},
	);

	const updateCommentMutation = useMutation(
		['updateComemnt'],
		(body: UpdateCommentDto) => CommentService.updateComment(body, postId),
		{
			onSuccess: data => {
				notify('success', '댓글이 수정 되었습니다');
				queryClient.invalidateQueries(['comment', postId]);
			},
			onError: error => {
				if (axios.isAxiosError(error)) {
					notify('error', error.response?.data.message);
				} else {
					console.error(error);
				}
			},
		},
	);

	const updateLikesCommentMutation = useMutation(
		['updateLikesComment'],
		(body: UpdateLikesCommentDto) => CommentService.updateLikesCommentId(body),
		{
			onSuccess: data => {
				if (data) {
					notify('success', '댓글 좋아요 하였습니다.');
				} else {
					notify('success', '댓글 좋아요 취소되었습니다.');
				}
				queryClient.invalidateQueries(['comment', postId]);
			},
			onError: error => {
				if (axios.isAxiosError(error)) {
					notify('error', error.response?.data.message);
				} else {
					console.error(error);
				}
			},
		},
	);

	const handleSendContentChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		setSendContent(e.target.value);
	};

	const handleCommentLikes = (value: number, commentId: string) => {
		const body: UpdateLikesCommentDto = {
			value: value,
			commentId: commentId,
			postId: postId,
		};
		updateLikesCommentMutation.mutate(body);
	};

	interface toastFunc {
		(type: 'success' | 'error' | 'info' | 'warning', message: string): void;
	}

	const notify: toastFunc = React.useCallback((type, message) => {
		ToastMessage({ type, message });
	}, []);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Comments</h1>
			<div className={styles.wrap}>
				{comments &&
					comments.map(comment => (
						<CommentItem
							key={comment.id}
							comment={comment}
							depth={0}
							replyContent={replyContent}
							openFormId={openFormId}
							onToggle={handleToggle}
							onReplySubmit={handleReplySubmit}
							onReplyContentChange={content => setReplyContent(content)}
							onCommentDelete={handleCommentDelete}
							onCommentLikes={handleCommentLikes}
						></CommentItem>
					))}
				<form onSubmit={event => handleReplySubmit(event, 'send')}>
					<div className={styles.send_comment_form}>
						<div>
							<Image
								className={styles.comment_avatar_img}
								src="/images/author/profile.jpeg"
								alt="avatar"
								width={40}
								height={40}
							></Image>
						</div>
						<div className={styles.send_right_container}>
							<div className={styles.send_content_wrap}>
								<textarea
									className={styles.send_content}
									value={sendContent}
									onChange={handleSendContentChange}
									placeholder="Write a reply..."
								></textarea>
							</div>
							<div className={styles.send_comment_btn}>
								<Button
									type="submit"
									className="text-white py-1 px-6 rounded-lg"
									style={{ backgroundColor: '#5357b6' }}
								>
									SEND
								</Button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Comment;
