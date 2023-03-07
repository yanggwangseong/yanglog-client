import React, { FC } from 'react';
import styles from './Comment.module.scss';
import Image from 'next/image';
import { FaReply } from 'react-icons/fa';
import { CommentType } from '@/shared/interfaces/comment.interface';
import CommentItem from './comment-item/CommentItem';

// todo: props 받아서 comment-item을 map으로 뿌려주기
const Comment: FC<{ comments: CommentType[] }> = ({ comments }) => {
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
						></CommentItem>
					))}
			</div>
		</div>
	);
};

export default Comment;
