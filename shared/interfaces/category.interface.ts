export interface CategoryInfo {
	id: string;
	category_name: string;
	priority: number;
	parentId: string | null;
	children?: CategoryInfo[];
}
