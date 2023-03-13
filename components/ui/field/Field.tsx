import React, { FC, forwardRef } from 'react';
import cn from 'classnames';
import styles from './Field.module.scss';
import { Field as IField } from './field.interface';

const Field = forwardRef<HTMLInputElement, IField>(
	({ type = 'text', size, style, Icon, ...rest }, ref) => {
		return (
			<>
				<div
					className={cn(styles.input, {
						[styles.withIcon]: !!Icon,
					})}
				>
					{Icon && (
						<div className={styles.icon}>
							<Icon size={size} />
						</div>
					)}
					<input ref={ref} type={type} style={style} {...rest} />
				</div>
			</>
		);
	},
);

Field.displayName = 'Field';

export default Field;
