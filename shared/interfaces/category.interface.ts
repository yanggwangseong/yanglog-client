export interface CategoryInfo {
	id: number;
	category_name: string;
	priority: number;
	parentId: string | null;
	children?: CategoryInfo[];
}
