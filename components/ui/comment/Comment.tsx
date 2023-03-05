import React, { FC } from 'react';
import styles from './Comment.module.scss';
import Image from 'next/image';
import { FaReply } from 'react-icons/fa';

// todo: props 받아서 comment-item을 map으로 뿌려주기
const Comment: FC = () => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Comments</h1>
			<div className={styles.wrap}>
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
							<div className={styles.comment_name}>양광성</div>
							<div className={styles.comment_date}>1 달전</div>
							<div className={styles.comment_reply_btn}>
								<div className="flex items-center justify-center">
									<FaReply size={14} color="#5357b6" />
								</div>
								<div className={styles.comment_reply_btn_text}>답글</div>
							</div>
						</div>
						<div className={styles.comment_description}>
							인상적인! 드래그 기능을 개선할 수 있을 것 같습니다. 하지만
							전반적으로 믿을 수 없을 것 같습니다. 당신은 디자인과 다양한
							중단점에서의 응답성이 정말 잘 작동합니다.
						</div>
					</div>
				</div>
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
							<div className={styles.comment_name}>양광성</div>
							<div className={styles.comment_date}>1 달전</div>
							<div className={styles.comment_reply_btn}>
								<div className="flex items-center justify-center">
									<FaReply size={14} color="#5357b6" />
								</div>
								<div className={styles.comment_reply_btn_text}>답글</div>
							</div>
						</div>
						<div className={styles.comment_description}>
							인상적인! 드래그 기능을 개선할 수 있을 것 같습니다. 하지만
							전반적으로 믿을 수 없을 것 같습니다. 당신은 디자인과 다양한
							중단점에서의 응답성이 정말 잘 작동합니다.
						</div>
					</div>
				</div>

				{/* 답댓글 */}
				<div className={styles.answer_comment_container}>
					<div className={`${styles.comment__container}`}>
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
								<div className={styles.comment_name}>양광성</div>
								<div className={styles.comment_date}>1 달전</div>
								<div className={styles.comment_reply_btn}>
									<div className="flex items-center justify-center">
										<FaReply size={14} color="#5357b6" />
									</div>
									<div className={styles.comment_reply_btn_text}>답글</div>
								</div>
							</div>
							<div className={styles.comment_description}>
								인상적인! 드래그 기능을 개선할 수 있을 것 같습니다. 하지만
								전반적으로 믿을 수 없을 것 같습니다. 당신은 디자인과 다양한
								중단점에서의 응답성이 정말 잘 작동합니다.
							</div>
						</div>
					</div>

					<div className={`${styles.comment__container}`}>
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
								<div className={styles.comment_name}>양광성</div>
								<div className={styles.comment_date}>1 달전</div>
								<div className={styles.comment_reply_btn}>
									<div className="flex items-center justify-center">
										<FaReply size={14} color="#5357b6" />
									</div>
									<div className={styles.comment_reply_btn_text}>답글</div>
								</div>
							</div>
							<div className={styles.comment_description}>
								인상적인! 드래그 기능을 개선할 수 있을 것 같습니다. 하지만
								전반적으로 믿을 수 없을 것 같습니다. 당신은 디자인과 다양한
								중단점에서의 응답성이 정말 잘 작동합니다.
							</div>
						</div>
					</div>
				</div>

				<div className={`${styles.comment__container}`}>
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
							<div className={styles.comment_name}>양광성</div>
							<div className={styles.comment_date}>1 달전</div>
							<div className={styles.comment_reply_btn}>
								<div className="flex items-center justify-center">
									<FaReply size={14} color="#5357b6" />
								</div>
								<div className={styles.comment_reply_btn_text}>답글</div>
							</div>
						</div>
						<div className={styles.comment_description}>
							인상적인! 드래그 기능을 개선할 수 있을 것 같습니다. 하지만
							전반적으로 믿을 수 없을 것 같습니다. 당신은 디자인과 다양한
							중단점에서의 응답성이 정말 잘 작동합니다.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Comment;
