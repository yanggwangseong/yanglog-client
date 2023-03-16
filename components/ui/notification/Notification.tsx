import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Notification.module.scss';
import NotificationItem from './notification-item/NotificationItem';

const Notification: FC = () => {
	return (
		<div className={styles.notification_container}>
			<div className={styles.notification_subject}>알림</div>
			<NotificationItem></NotificationItem>
		</div>
	);
};

export default Notification;
