import { IconType } from 'react-icons';
import {
	BiCategory,
	BiCommentDetail,
	BiCreditCard,
	BiMap,
} from 'react-icons/bi';

export interface MenuItem {
	link: string;
	Icon: IconType;
	title: string;
	subtitle: string;
}

export const menu: MenuItem[] = [
	{
		link: '/manage/category',
		Icon: BiCategory,
		title: 'Category',
		subtitle: 'Category management',
	},
	{
		link: '/manage/blank1',
		Icon: BiMap,
		title: 'Category',
		subtitle: 'Category management',
	},
	{
		link: '/manage/blank2',
		Icon: BiCreditCard,
		title: 'Category',
		subtitle: 'Category management',
	},
	{
		link: '/manage/blank3',
		Icon: BiCommentDetail,
		title: 'Category',
		subtitle: 'Category management',
	},
];
