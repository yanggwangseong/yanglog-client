import { CommentType } from '@/shared/interfaces/comment.interface';
import React, { FC } from 'react';
import Image from 'next/image';
import { FaReply } from 'react-icons/fa';
import styles from './CommentItem.module.scss';

const CommentItem: FC<{ comment: CommentType; depth: number }> = ({
	comment,
	depth,
}) => {
	return (
		<>
			<div className={styles.comment__container}>
				<div className={styles.vote_container}>
					<div className="text-center" style={{ color: '#c5c6ef' }}>
						+
					</div>
					<div className="text-center" style={{ color: '#5357b6' }}>
						5
					</div>
					<div className="text-center" style={{ color: '#c5c6ef' }}>
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
						<div className={styles.comment_name}>{comment.writer}</div>
						<div className={styles.comment_date}>1 달전</div>
						<div className={styles.comment_reply_btn}>
							<div className="flex items-center justify-center">
								<FaReply size={14} color="#5357b6" />
							</div>
							<div className={styles.comment_reply_btn_text}>답글</div>
						</div>
					</div>
					{comment.replyUserName && (
						<div className="text-xl text-cyan-500 mt-4 cursor-pointer">
							@{comment.replyUserName}
						</div>
					)}
					<div className={styles.comment_description}>
						{comment.comment_content}
					</div>
				</div>
			</div>
			{comment.children_comments && (
				<div className={styles.answer_comment_container}>
					{comment.children_comments?.map(childComment => (
						<CommentItem
							key={childComment.id}
							comment={childComment}
							depth={depth + 1}
						/>
					))}
				</div>
			)}
		</>
	);
};

export default CommentItem;
