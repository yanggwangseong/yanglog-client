import cn from 'classnames';
import { FC, PropsWithChildren } from 'react';
import { Button } from './button.interface';
import styles from './Button.module.scss';

const Button: FC<PropsWithChildren<Button>> = ({
	children,
	className,
	...rest
}) => {
	return (
		<button className={cn(styles.button, className)} {...rest}>
			{children}
		</button>
	);
};

export default Button;
