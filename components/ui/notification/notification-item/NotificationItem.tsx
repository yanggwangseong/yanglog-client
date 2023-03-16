import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './NotificationItem.module.scss';

const NotificationItem: FC = () => {
	return (
		<div className={styles.notification_item_container}>
			<div className={styles.avatar}>
				<Image
					className={styles.avatar_img}
					src="/images/author/dev-jeans 8.png"
					alt="avatar"
					width={44}
					height={44}
				></Image>
			</div>
			<div className="text-left">
				<div className={styles.title}>title</div>
				<div className={styles.description}>description</div>
				<div className={styles.date}>2023-07-23 10:30</div>
			</div>
		</div>
	);
};

export default NotificationItem;
