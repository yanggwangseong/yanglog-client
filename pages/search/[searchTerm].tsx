import Search from '@/components/sceens/search/Search';
import { PostService } from '@/services/post/post.service';
import { SearchType } from '@/shared/interfaces/home.interface';
import { GetServerSideProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { QueryClient, dehydrate } from 'react-query';

const SearchPage: NextPage = () => {
	return <Search></Search>;
};

export default SearchPage;

interface IParams extends ParsedUrlQuery {
	searchTerm: string;
}

export const getServerSideProps: GetServerSideProps = async context => {
	try {
		const queryClient = new QueryClient();
		const { searchTerm } = context.params as IParams;

		await queryClient.prefetchQuery<SearchType>(
			['search', searchTerm],
			async () => await PostService.searchPosts(searchTerm),
		);

		return {
			props: {
				dehydratedState: dehydrate(queryClient),
				searchTerm,
			},
		};
	} catch (error) {
		return {
			props: {},
		};
	}
};
