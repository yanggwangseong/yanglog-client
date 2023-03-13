import Field from '@/components/ui/field/Field';
import Format from '@/components/ui/layout/format';
import React, { FC } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

const Search: FC = () => {
	return (
		<Format title="검색페이지">
			<div className="w-full md:max-w-screen-md my-6 ml-auto mr-auto">
				<div>
					<Field
						className="w-full h-14 px-3 py-3 text-2xl"
						Icon={IoSearchOutline}
						IconSize={30}
					></Field>
				</div>
				<div className="mt-4 mb-16">총 2871개의 포스트를 찾았습니다.</div>
				<div className="mb-6 flex"></div>
			</div>
		</Format>
	);
};

export default Search;
