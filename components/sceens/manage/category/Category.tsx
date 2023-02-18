import React, { FC } from 'react';
import styles from './Category.module.scss';
import Format from '@/components/ui/layout/format';
import Sidebar from '@/components/ui/layout/sidebar/Sidebar';
import { CategoryInfo } from '@/shared/interfaces/category.interface';

const Category: FC<CategoryInfo[]> = props => {
	console.log(props);
	return (
		<Format title="카테고리 관리">
			<div className={styles.container}>
				<Sidebar />
				<div className={styles.contents_container}>
					<div className={styles.contents_title}>Contents</div>
					<div className={styles.contents_card}></div>
				</div>
			</div>
		</Format>
	);
};

export default Category;
