import React, { FC, useState } from 'react';
import Image from 'next/image';
import { FaPencilAlt, FaReply, FaTrash } from 'react-icons/fa';
import styles from './CommentItem.module.scss';
import Button from '@/components/ui/button/Button';
import { CommentItemProps } from './comment-item.interface';
import { useRecoilState } from 'recoil';
import { Login, loginAtom } from 'atoms/loginAtom';
import cn from 'classnames';

const CommentItem: FC<CommentItemProps> = ({
	comment,
	depth,
	replyContent,
	openFormId,
	onToggle,
	onReplySubmit,
	onReplyContentChange,
	onCommentDelete,
}) => {
	const [LoginState] = useRecoilState<Login>(loginAtom);

	const handleEditToggle = () => {
		onReplyContentChange(comment.comment_content);
		onToggle(comment.id, 'edit');
	};

	const handleReplyToggle = () => {
		onReplyContentChange('');
		onToggle(comment.id, 'reply');
	};

	const handleCommentDelete = () => {
		if (confirm('해당 댓글을 삭제 하겠습니까?')) {
			onCommentDelete(comment.id);
		}
	};

	const handleReplyContentChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		onReplyContentChange(e.target.value);
	};

	return comment ? (
		<>
			<div className={styles.comment__container}>
				<div className={styles.vote_container}>
					<div
						className={cn(styles.vote__plus_btn, {
							[styles.active]:
								LoginState.loginState === true && comment.mylike === 1,
						})}
					>
						+
					</div>
					<div className={styles.vote__score}>{comment.likes}</div>

					<div
						className={cn(styles.vote__minus_btn, {
							[styles.active]:
								LoginState.loginState === true && comment.mylike === -1,
						})}
					>
						-
					</div>
				</div>
				<div className={styles.comment_contents_container}>
					<div className={styles.comment_header_container}>
						<div className={styles.comment_avatar_img_container}>
							<Image
								className={styles.comment_avatar_img}
								src="/images/author/profile.jpeg"
								alt="avatar"
								width={32}
								height={32}
							></Image>
						</div>
						<div className="flex items-center justify-center">
							<div className={styles.comment_name}>{comment.writer}</div>
						</div>
						{LoginState.id === comment.userId && (
							<div className="flex items-center justify-center">
								<div className={styles.comment_you_tag}>you</div>
							</div>
						)}
						<div className="flex items-center justify-center">
							<div className={styles.comment_date}>1 달전</div>
						</div>
						{LoginState.id === comment.userId ? (
							<div className={styles.comment_btn_container}>
								<div
									className={styles.comment_delete_btn}
									onClick={handleCommentDelete}
								>
									<div className="flex items-center justify-center">
										<FaTrash size={12} color="#ed6368" />
									</div>
									<div className="flex items-center justify-center">
										<div className={styles.comment_delete_btn_text}>Delete</div>
									</div>
								</div>
								<div
									className={styles.comment_edit_btn}
									onClick={handleEditToggle}
								>
									<div className="flex items-center justify-center">
										<FaPencilAlt size={12} color="#5357b6" />
									</div>
									<div className="flex items-center justify-center">
										<div className={styles.comment_edit_btn_text}>Edit</div>
									</div>
								</div>
							</div>
						) : (
							<div
								className={styles.comment_reply_btn}
								onClick={handleReplyToggle}
							>
								<div className="flex items-center justify-center">
									<FaReply size={14} color="#5357b6" />
								</div>
								<div className={styles.comment_reply_btn_text}>답글</div>
							</div>
						)}
					</div>
					{comment.replyUserName && (
						<div className={styles.reply_user_name}>
							@{comment.replyUserName}
						</div>
					)}
					{/* 수정댓글작성폼 */}
					{comment.id === openFormId.editCommentId ? (
						<form onSubmit={event => onReplySubmit(event, 'edit', comment.id)}>
							<div className={styles.reply_comment_form}>
								<div className={styles.reply_right_container}>
									<div className={styles.reply_content_wrap}>
										<textarea
											className={styles.reply_content}
											value={replyContent}
											onChange={handleReplyContentChange}
											placeholder="Write a reply..."
										/>
									</div>
								</div>
							</div>
							<div className={styles.reply_comment_btn}>
								<Button
									type="submit"
									className="text-white py-1 px-6 rounded-lg"
									style={{ backgroundColor: '#5357b6' }}
								>
									Update
								</Button>
							</div>
						</form>
					) : (
						<div className={styles.comment_description}>
							{comment.comment_content}
						</div>
					)}
				</div>
			</div>
			{/* 답글 작성 폼 */}
			{comment.id === openFormId.replyCommentId && (
				<form
					onSubmit={event =>
						onReplySubmit(
							event,
							'reply',
							'',
							comment.parentId ? comment.parentId : openFormId.replyCommentId,
						)
					}
				>
					<div className={styles.reply_comment_form}>
						<div>
							<Image
								className={styles.comment_avatar_img}
								src="/images/author/profile.jpeg"
								alt="avatar"
								width={40}
								height={40}
							></Image>
						</div>
						<div className={styles.reply_right_container}>
							<div className={styles.reply_content_wrap}>
								<textarea
									className={styles.reply_content}
									value={replyContent}
									onChange={handleReplyContentChange}
									placeholder="Write a reply..."
								/>
							</div>
							<div className={styles.reply_comment_btn}>
								<Button
									type="submit"
									className="text-white py-1 px-6 rounded-lg"
									style={{ backgroundColor: '#5357b6' }}
								>
									Reply
								</Button>
							</div>
						</div>
					</div>
				</form>
			)}
			{comment.children_comments && (
				<div className={styles.answer_comment_container}>
					{comment.children_comments?.map(childComment => (
						<CommentItem
							key={childComment.id}
							comment={childComment}
							depth={depth + 1}
							replyContent={replyContent}
							openFormId={openFormId}
							onToggle={onToggle}
							onReplySubmit={onReplySubmit}
							onReplyContentChange={onReplyContentChange}
							onCommentDelete={onCommentDelete}
						/>
					))}
				</div>
			)}
		</>
	) : (
		<div>Not found Comments!</div>
	);
};

export default CommentItem;
