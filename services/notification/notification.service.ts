import { NotificationListType } from '@/shared/interfaces/notification.interface';
import { AuthApiClient } from 'api/axiosInstance';

export const NotificationService = {
	async getNotificationAll() {
		const { data } = await AuthApiClient.get<NotificationListType>(
			`/notifications`,
		);
		return data;
	},
};
