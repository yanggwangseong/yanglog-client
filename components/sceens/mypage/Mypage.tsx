import Format from '@/components/ui/layout/format';
import React, { FC } from 'react';
import styles from './Mypage.module.scss';
import Sidebar from '@/components/ui/layout/sidebar/Sidebar';

const Mypage: FC = () => {
	return (
		<Format title="마이페이지">
			<div className={styles.container}>
				<Sidebar />
				<div className={styles.contents_container}>
					<div className={styles.contents_title}>Account</div>
					<div className={styles.contents_card}></div>
				</div>
			</div>
		</Format>
	);
};

export default Mypage;
