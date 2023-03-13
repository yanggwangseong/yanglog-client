import Search from '@/components/sceens/search/Search';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';

const SearchPage: NextPage = () => {
	return <Search></Search>;
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async context => {
	console.log(context.params);
	return {
		props: {},
	};
};
