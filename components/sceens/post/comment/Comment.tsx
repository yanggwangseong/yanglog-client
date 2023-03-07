import React, { FC, FormEvent, useState } from 'react';
import styles from './Comment.module.scss';
import { CommentDto, CommentType } from '@/shared/interfaces/comment.interface';
import Image from 'next/image';
import CommentItem from './comment-item/CommentItem';
import Button from '@/components/ui/button/Button';
import { useMutation, useQueryClient } from 'react-query';
import { CommentService } from '@/services/comment/comment.service';
import axios from 'axios';
import ToastMessage from '@/components/toast';
import { useRouter } from 'next/router';

const Comment: FC<{ comments: CommentType[] }> = ({ comments }) => {
	const [replyContent, setReplyContent] = useState<string>('');
	const [sendContent, setSendContent] = useState<string>('');
	const [openReplyFormId, setOpenReplyFormId] = useState<string>('');

	const router = useRouter();
	const { postId: postIdPram } = router.query;
	const queryClient = useQueryClient();

	const postId = '5b1d8ca1-0783-4d19-9905-d5241e3f8e16';

	const handleReplyToggle = (commentId: string) => {
		setOpenReplyFormId(prevOpenReplyFormId =>
			prevOpenReplyFormId === commentId ? '' : commentId,
		);
	};

	const handleReplySubmit = (
		e: FormEvent,
		type: string,
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
			setSendContent('');
		} else if (type === 'reply') {
			const body: CommentDto = {
				comment_content: replyContent,
				parentId: parentId,
				replyId: openReplyFormId,
				postId: postId,
			};
			createCommentMutation.mutate(body);
			setReplyContent('');
		}
		setReplyContent('');
		setOpenReplyFormId('');
	};

	const createCommentMutation = useMutation(
		['createComment'],
		(data: CommentDto) => CommentService.createComment(data),
		{
			onSuccess: data => {
				notify('success', '댓글이 작성 되었습니다.');
				queryClient.invalidateQueries(['comment', postIdPram]);
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
							openReplyFormId={openReplyFormId}
							onReplyToggle={handleReplyToggle}
							onReplySubmit={handleReplySubmit}
							onReplyContentChange={content => setReplyContent(content)}
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
