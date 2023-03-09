import type { GetServerSideProps, NextPage } from 'next';
import Format from '../components/ui/layout/format';

//components
import Section1 from '../components/section/section1';
import Section2 from '../components/section/section2';
import Section3 from '../components/section/section3';
import Section4 from '../components/section/section4';
import { QueryClient, dehydrate, useQuery } from 'react-query';
import { HomePostType } from '@/shared/interfaces/home.interface';
import { HomeService } from '@/services/home/home.service';
import Spinner from '@/components/_child/spinner';
import Error from '@/components/_child/error';

const HomePage: NextPage = () => {
	const { data, isLoading, isError } = useQuery(
		['main'],
		async () => await HomeService.getMainPosts(),
	);

	if (isLoading) {
		return <Spinner></Spinner>;
	}

	if (isError) {
		return <Error></Error>;
	}

	if (!data) {
		return null;
	}

	return (
		<Format title="YangLog">
			<Section1 trending={data.trending}></Section1>
			<Section2 posts={data.posts}></Section2>
			<Section3 popular={data.popular}></Section3>
			<Section4 popular={data.popular}></Section4>
		</Format>
	);
};

export const getServerSideProps: GetServerSideProps = async context => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery<HomePostType>(
		['main'],
		async () => await HomeService.getMainPosts(),
	);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
};

export default HomePage;
