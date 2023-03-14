import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { FC } from 'react';

export interface Param extends ParsedUrlQuery {
	id: string;
}

const Social: FC = () => {
	const router = useRouter();
	const { id } = router.query as Param;
	return <div>소셜 회원가입 로직 여기!</div>;
};

export default Social;
