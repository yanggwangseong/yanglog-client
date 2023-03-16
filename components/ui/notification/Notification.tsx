import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Notification.module.scss';
import NotificationItem from './notification-item/NotificationItem';
import { NotificationItemType } from '@/shared/interfaces/notification.interface';

const Notification: FC<{ notifications: NotificationItemType[] }> = ({
	notifications,
}) => {
	return (
		<div className={styles.notification_container}>
			<div className={styles.notification_subject}>알림</div>
			{notifications &&
				notifications.map(notification => (
					<NotificationItem
						key={notification.id}
						item={notification}
					></NotificationItem>
				))}
		</div>
	);
};

export default Notification;
