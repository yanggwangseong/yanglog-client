import React, { FC, useState } from 'react';
import Image from 'next/image';
import { FaReply } from 'react-icons/fa';
import styles from './CommentItem.module.scss';
import Button from '@/components/ui/button/Button';
import { CommentItemProps } from './comment-item.interface';

const CommentItem: FC<CommentItemProps> = ({
	comment,
	depth,
	replyContent,
	openReplyFormId,
	onReplyToggle,
	onReplySubmit,
	onReplyContentChange,
}) => {
	const handleReplyToggle = () => {
		onReplyToggle(comment.id);
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
					<div className={styles.vote__plus_btn}>+</div>
					<div className={styles.vote__score}>5</div>
					<div className={styles.vote__minus_btn}>-</div>
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
						<div className={styles.comment_name}>{comment.writer}</div>
						<div className={styles.comment_date}>1 달전</div>
						<div
							className={styles.comment_reply_btn}
							onClick={handleReplyToggle}
						>
							<div className="flex items-center justify-center">
								<FaReply size={14} color="#5357b6" />
							</div>
							<div className={styles.comment_reply_btn_text}>답글</div>
						</div>
					</div>
					{comment.replyUserName && (
						<div className={styles.reply_user_name}>
							@{comment.replyUserName}
						</div>
					)}
					<div className={styles.comment_description}>
						{comment.comment_content}
					</div>
				</div>
			</div>
			{/* 답글 작성 폼 */}
			{comment.id === openReplyFormId && (
				<form
					onSubmit={event => onReplySubmit(event, 'reply', comment.parentId)}
				>
					<div className={styles.reply_comment_form}>
						{/* <p>{comment.parentId}</p> */}
						<p>{openReplyFormId}</p>
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
							openReplyFormId={openReplyFormId}
							onReplyToggle={onReplyToggle}
							onReplySubmit={onReplySubmit}
							onReplyContentChange={onReplyContentChange}
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
