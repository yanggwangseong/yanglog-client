import React, { FC, useState } from 'react';
import styles from './Category.module.scss';
import Format from '@/components/ui/layout/format';
import Sidebar from '@/components/ui/layout/sidebar/Sidebar';
import { CategoryInfo } from '@/shared/interfaces/category.interface';
import CategoryItem from './category-item/CategoryItem';

const Category: FC<{ categories: CategoryInfo[] }> = ({ categories }) => {
	const [categorys, setCategories] = useState(categories);

	const handleDrag = (dragIndex: string) => {
		//console.log('Drag: ', dragIndex);
	};

	const handleDrop = (dragIndex: string, hoverIndex: string) => {
		//TODO dragIndex 없는 경우 자식을 drag 하여 부모에 drop 한 경우
		if (!dragIndex) {
			console.log('자식 부모 드랍 경우, 로직 추가해야함', dragIndex);
			return;
		}

		setCategories(prevCategories => {
			const updatedCategories = [...prevCategories];

			const selectIndex = updatedCategories.findIndex(
				category => category.id === dragIndex,
			);
			const updateIndex = updatedCategories.findIndex(
				category => category.id === hoverIndex,
			);

			const updatePriority = updatedCategories[updateIndex].priority;
			const selectPriority = updatedCategories[selectIndex].priority;

			updatedCategories[updateIndex].priority = selectPriority;
			updatedCategories[selectIndex].priority = updatePriority;

			const draggedItem = updatedCategories[selectIndex];
			updatedCategories.splice(selectIndex, 1);
			updatedCategories.splice(updateIndex, 0, draggedItem);

			return updatedCategories;
		});
	};

	const handleDropChild = (dragIndex: string, hoverIndex: string) => {
		setCategories(prevCategories => {
			const updatedCategories = [...prevCategories];

			const selectParentIndex = updatedCategories.findIndex(category => {
				return category.children?.find(child => child.id === dragIndex);
			});

			const updateParentIndex = updatedCategories.findIndex(category => {
				return category.children?.find(child => child.id === hoverIndex);
			});

			// 부모가 같은 곳에서 순서를 변경할 때
			if (selectParentIndex === updateParentIndex) {
				const selectParent = updatedCategories[selectParentIndex];
				const dragChildIndex = selectParent.children!.findIndex(
					child => child.id === dragIndex,
				);
				const hoverChildIndex = selectParent.children!.findIndex(
					child => child.id === hoverIndex,
				);

				// 자식 카테고리 순서 변경
				const draggedItem = selectParent.children![dragChildIndex];
				selectParent.children!.splice(dragChildIndex, 1);
				selectParent.children!.splice(hoverChildIndex, 0, draggedItem);
			}

			return updatedCategories;
		});
	};

	const handleClickSubmit = () => {
		console.log(categorys);
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
									handleDropChild={handleDropChild}
								></CategoryItem>
							))}
					</div>
					<div>
						<div>
							<button type="button" onClick={handleClickSubmit}>
								저장
							</button>
						</div>
					</div>
				</div>
			</div>
		</Format>
	);
};

export default Category;
