import React, { FC, useState } from 'react';
import styles from './Category.module.scss';
import Format from '@/components/ui/layout/format';
import Sidebar from '@/components/ui/layout/sidebar/Sidebar';
import { CategoryInfo } from '@/shared/interfaces/category.interface';
import CategoryItem from './category-item/CategoryItem';

const Category: FC<{ categories: CategoryInfo[] }> = ({ categories }) => {
	const [categorys, setCategories] = useState(categories);

	const handleDrag = (dragIndex: string) => {
		console.log('Drag: ', dragIndex);
	};

	const handleDrop = (dragIndex: string, hoverIndex: string) => {
		console.log(hoverIndex);
		setCategories(prevCategories => {
			const updatedCategories = [...prevCategories];

			const selectIndex = updatedCategories.findIndex(
				category => category.id === dragIndex,
			);
			const updateIndex = updatedCategories.findIndex(
				category => category.id === hoverIndex,
			);
			// updatedCategories.splice(
			// 	selectIndex,
			// 	0,
			// 	updatedCategories.splice(updateIndex, 1)[0],
			// );
			const draggedItem = updatedCategories[selectIndex];
			updatedCategories.splice(selectIndex, 1);
			updatedCategories.splice(updateIndex, 0, draggedItem);

			return updatedCategories;
		});
	};

	return (
		<Format title="카테고리 관리">
			<div className={styles.container}>
				<Sidebar />
				<div className={styles.contents_container}>
					<div className={styles.contents_title}>Contents</div>
					<div className={styles.contents_card}>
						{categorys &&
							categorys.map(category => (
								<CategoryItem
									key={category.id}
									category={category}
									depth={0}
									handleDrag={handleDrag}
									handleDrop={handleDrop}
								></CategoryItem>
							))}
					</div>
				</div>
			</div>
		</Format>
	);
};

export default Category;
