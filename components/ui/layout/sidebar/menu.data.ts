import { IconType } from 'react-icons';
import {
	BiCategory,
	BiCommentDetail,
	BiCreditCard,
	BiMap,
	BiUser,
	BiNotification,
	BiBell,
} from 'react-icons/bi';

export interface MenuItem {
	link: string;
	Icon: IconType;
	title: string;
	subtitle: string;
}

export const menu: MenuItem[] = [
	{
		link: '/mypage',
		Icon: BiUser,
		title: 'Account',
		subtitle: 'Personal information',
	},
	{
		link: '/manage/category',
		Icon: BiCategory,
		title: 'Category',
		subtitle: 'Category management',
	},
	{
		link: '/manage/tech-blog',
		Icon: BiNotification,
		title: 'TechBlog',
		subtitle: 'TechBlog notification',
	},
	{
		link: '/manage/notification',
		Icon: BiBell,
		title: 'Notification',
		subtitle: 'Notification history',
	},
];
