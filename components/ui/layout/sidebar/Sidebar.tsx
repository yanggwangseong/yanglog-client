import React, { FC } from 'react';
import styles from './Sidebar.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { menu } from './menu.data';
import cn from 'classnames';

const Sidebar: FC = () => {
	const { asPath } = useRouter();

	return (
		<div>
			<h2 className={styles.title}>Settings</h2>

			{menu.map(item => (
				<Link key={item.link} href={item.link}>
					<div
						className={cn(styles.sidebar_card, {
							[styles.active]: item.link === asPath,
						})}
					>
						<div
							className={cn(styles.sidebar_icon_container, {
								[styles.active]: item.link === asPath,
							})}
						>
							<item.Icon />
						</div>
						<div className={styles.sidebar_card_contents_wrap}>
							<div className={styles.sidebar_card_title}>{item.title}</div>
							<div className={styles.sidebar_card_subtitle}>
								{item.subtitle}
							</div>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
};

export default Sidebar;
