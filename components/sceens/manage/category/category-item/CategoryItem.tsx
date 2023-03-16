import Button from '@/components/ui/button/Button';
import { CategoryInfo } from '@/shared/interfaces/category.interface';
import React, { FC, useState } from 'react';
import { FaAlignJustify } from 'react-icons/fa';

const CategoryItem: FC<{
	category: CategoryInfo;
	depth: number;
	handleDrag: (dragIndex: string) => void;
	handleDrop: (dragIndex: string, hoverIndex: string) => void;
	handleDropChild: (dragIndex: string, hoverIndex: string) => void;
}> = ({ category, depth, handleDrag, handleDrop, handleDropChild }) => {
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const [isButton, setIsButton] = useState<boolean>(false);

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

	const handleDropChildItem = (
		event: React.DragEvent<HTMLDivElement>,
		index: string,
	) => {
		event.preventDefault();
		setIsHovered(false);
		handleDropChild(event.dataTransfer.getData('dragChildIndex'), index);
	};

	const parentDraggableProps = {
		draggable: true,
		onDragStart: (event: React.DragEvent<HTMLDivElement>) => {
			console.log('dragStart:부모 실행'); // 실행 x
			event.dataTransfer.setData('dragIndex', category.id);
			handleDragStart(category.id);
		},
		onDragEnd: handleDragEnd,
		onDragOver: handleDragOver,
		onDragLeave: handleDragLeave,
		onDrop: (event: React.DragEvent<HTMLDivElement>) => {
			console.log('dragDrop:부모실행'); // 실행 o
			handleDropItem(event, category.id);
		},
		style: {
			opacity: isDragging ? 0.5 : 1,
			borderTop: isHovered ? '3px solid red' : 'none',
		},
	};

	const childDraggableProps = {
		draggable: true,
		onDragStart: (event: React.DragEvent<HTMLDivElement>) => {
			console.log('dragStart:자식실행'); // 실행 o
			event.stopPropagation(); // 이벤트 전파 중지
			event.dataTransfer.setData('dragChildIndex', category.id);
			handleDragStart(category.id);
		},
		onDragEnd: handleDragEnd,
		onDragOver: handleDragOver,
		onDragLeave: handleDragLeave,
		onDrop: (event: React.DragEvent<HTMLDivElement>) => {
			console.log('dragDrop:자식실행'); // 실행 o
			event.stopPropagation(); // 이벤트 전파 중지
			handleDropChildItem(event, category.id);
		},

		style: {
			opacity: isDragging ? 0.5 : 1,
			borderTop: isHovered ? '3px solid blue' : 'none',
			marginLeft: `${depth * 10}%`,
		},
	};

	const draggableProps = depth ? childDraggableProps : parentDraggableProps;

	return (
		<div {...draggableProps} style={draggableProps.style}>
			<div
				className="flex gap-5"
				onMouseEnter={() => setIsButton(true)}
				onMouseLeave={() => setIsButton(false)}
			>
				<div className="cursor-move">
					<FaAlignJustify></FaAlignJustify>
				</div>
				<div style={{ height: '100px' }}>{category.category_name}</div>
				{isButton && (
					<div className="flex gap-3">
						<Button
							type="button"
							className="h-11 bg-white text-primary 
                                    border border-primary text-xl px-3 py-2 rounded-lg
                                    font-normal
                                    "
							style={{ width: '83px' }}
						>
							추가
						</Button>
						<Button
							type="button"
							className="h-11 bg-white text-primary 
                                    border border-primary text-xl px-3 py-2 rounded-lg
                                    font-normal
                                    "
							style={{ width: '83px' }}
						>
							수정
						</Button>
						<Button
							type="button"
							className="h-11 bg-white text-primary 
                                    border border-primary text-xl px-3 py-2 rounded-lg
                                    font-normal
                                    "
							style={{ width: '83px' }}
						>
							삭제
						</Button>
					</div>
				)}
			</div>
			{category.children?.map(childCategory => (
				<CategoryItem
					key={childCategory.id}
					category={childCategory}
					handleDrag={handleDrag}
					handleDrop={handleDrop}
					handleDropChild={handleDropChild}
					depth={depth + 1}
				/>
			))}
		</div>
	);
};

export default CategoryItem;
