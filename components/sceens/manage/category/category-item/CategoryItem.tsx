import Button from '@/components/ui/button/Button';
import { CategoryInfo } from '@/shared/interfaces/category.interface';
import React, { FC, useState } from 'react';
import { FaAlignJustify, FaAngleDown, FaAngleRight } from 'react-icons/fa';

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
		<div className="" {...draggableProps} style={draggableProps.style}>
			<div
				className="bg-white flex border border-solid"
				onMouseEnter={() => setIsButton(true)}
				onMouseLeave={() => setIsButton(false)}
			>
				{category.children ? (
					<div
						className="flex items-center justify-center w-7"
						style={{
							backgroundColor: '#FAFBFC',
						}}
					>
						<FaAngleDown color="gray" size={14}></FaAngleDown>
					</div>
				) : (
					<div
						className="w-7 flex items-center justify-center text-center"
						style={{
							backgroundColor: '#FAFBFC',
						}}
					>
						.
					</div>
				)}
				<div className="flex gap-5 py-3 px-4 ">
					<div className="cursor-move flex items-center justify-center">
						<FaAlignJustify size={18}></FaAlignJustify>
					</div>
					<div className="flex items-center justify-center">
						{category.category_name}
					</div>
					{isButton && (
						<div className="flex gap-3 ml-auto">
							<Button
								type="button"
								className=" bg-white text-primary 
                                    border border-primary text-xl rounded-lg
                                    font-normal
                                    "
								style={{ width: '83px' }}
							>
								추가
							</Button>
							<Button
								type="button"
								className=" bg-white text-primary 
                                    border border-primary text-xl rounded-lg
                                    font-normal
                                    "
								style={{ width: '83px' }}
							>
								수정
							</Button>
							<Button
								type="button"
								className=" bg-white text-primary 
                                    border border-primary text-xl rounded-lg
                                    font-normal
                                    "
								style={{ width: '83px' }}
							>
								삭제
							</Button>
						</div>
					)}
				</div>
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
