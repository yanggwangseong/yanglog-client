export interface NotificationItemType {
	id: string;
	title: string;
	description: string;
	postId: string;
	sendDate: string;
	sender: string;
	senderImg: string;
}

export interface NotificationListType {
	list: NotificationItemType[];
	count: number;
}
