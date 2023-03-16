import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './NotificationItem.module.scss';
import { NotificationItemType } from '@/shared/interfaces/notification.interface';
import { getTimeDifference } from '@/utils/getTimeDifference';
import { useRouter } from 'next/router';

const NotificationItem: FC<{ item: NotificationItemType }> = ({ item }) => {
	const router = useRouter();
	return (
		<div className={styles.notification_item_container}>
			<div className={styles.avatar}>
				<Image
					className={styles.avatar_img}
					src={item.senderImg}
					alt="avatar"
					width={44}
					height={44}
				></Image>
			</div>
			<div className="text-left w-full">
				<div className={styles.title_container}>
					<div className={styles.title}>{item.title}</div>
					<div className={styles.date}>{getTimeDifference(item.sendDate)}</div>
				</div>
				<div className={styles.description}>{item.description}</div>
			</div>
		</div>
	);
};

export default NotificationItem;
