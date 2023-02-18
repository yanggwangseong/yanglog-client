import { CategoryInfo } from '@/shared/interfaces/category.interface';
import { AuthApiClient } from 'api/axiosInstance';

export const CategoryService = {
	async getCategory() {
		const { data } = await AuthApiClient.get<CategoryInfo[]>(
			`/manage/categories`,
		);
		return data;
	},
};
