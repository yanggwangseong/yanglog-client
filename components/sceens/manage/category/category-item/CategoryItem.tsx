import { CategoryInfo } from '@/shared/interfaces/category.interface';
import React, { FC, useState } from 'react';

const CategoryItem: FC<{
	category: CategoryInfo;
	depth: number;
	handleDrag: (dragIndex: string) => void;
	handleDrop: (dragIndex: string, hoverIndex: string) => void;
}> = ({ category, depth, handleDrag, handleDrop }) => {
	const [isDragging, setIsDragging] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const handleDragStart = (index: string) => {
		setIsDragging(true);

		handleDrag(index);
	};

	const handleDragEnd = () => {
		setIsDragging(false);
	};

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();

		setIsHovered(true);
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		setIsHovered(false);
	};

	const handleDropItem = (
		event: React.DragEvent<HTMLDivElement>,
		index: string,
	) => {
		event.preventDefault();
		setIsHovered(false);
		handleDrop(event.dataTransfer.getData('dragIndex'), index);
	};

	return (
		<div
			draggable
			onDragStart={event => {
				event.dataTransfer.setData('dragIndex', category.id);
				handleDragStart(category.id);
			}}
			onDragEnd={handleDragEnd}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={event => handleDropItem(event, category.id)}
			style={{
				opacity: isDragging ? 0.5 : 1,
				borderTop: isHovered ? '2px solid red' : 'none',
			}}
		>
			<div style={{ marginLeft: `${depth * 10}%`, height: '100px' }}>
				{category.id}
			</div>
			{category.children?.map(childCategory => (
				<CategoryItem
					key={childCategory.id}
					category={childCategory}
					handleDrag={handleDrag}
					handleDrop={handleDrop}
					depth={depth + 1}
				/>
			))}
		</div>
	);
};

export default CategoryItem;
