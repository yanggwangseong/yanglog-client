import React, { FC } from 'react';

const spinner: FC = () => {
	return (
		<div className="flex justify-center py-14">
			<span className="loader"></span>
		</div>
	);
};

export default spinner;
