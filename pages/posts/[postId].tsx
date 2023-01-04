import type {
	GetServerSideProps,
	GetStaticPaths,
	GetStaticProps,
	InferGetStaticPropsType,
	NextPage,
} from 'next';
import Image from 'next/image';
import Format from '../../layout/format';
import Author from '../../components/_child/author';
import Ralated from '../../components/_child/ralated';
import { ParsedUrlQuery } from 'querystring';
import { dehydrate, QueryClient, useQuery, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import Error from '../../components/_child/error';
import Spinner from '../../components/_child/spinner';
import { getPostById, getPostAll } from '../../api/postService';
import { Post } from '../../interfaces/post';

const Page = () => {
	const router = useRouter();
	const { postId } = router.query;
	//const { data, isLoading, isError } = useQuery(["post"], () => getPost(postId ? postId : 1));
	const { data, isLoading, isError } = useQuery<Post>(['post', postId], () =>
		getPostById(postId ? postId : 1),
	);

	//const {id, title, subtitle, description, category, img, published, author } = posts;

	if (isLoading) {
		return <Spinner></Spinner>;
	}
	if (isError) {
		return <Error></Error>;
	}

	//const {id, title, subtitle, description, category, img, published, author } = data;
	//const {id, title, subtitle, description, category, img, published, author }:Post = data;
	const title = data?.title;
	const author = data?.author;
	const subtitle = data?.subtitle;
	const img = data?.img;
	const description = data?.description;

	return (
		<Format title={title}>
			<section className=" container mx-auto md:px-2 py-16 lg:w-1/2">
				<div className=" flex justify-center ">
					{author ? <Author author={author}></Author> : null}
				</div>
				<div className="post py-10">
					<h1 className=" font-bold text-4xl text-center pb-5">
						{title || null}
					</h1>
					<p className=" text-gray-500 text-xl text-center">
						{subtitle || null}
					</p>
					<div className="py-10">
						<Image src={img || '/'} width={900} height={600} alt={'/'}></Image>
					</div>
					<div className="content text-gray-600 text-lg flex flex-col gap-4">
						{description || null}
					</div>
				</div>
				<Ralated></Ralated>
			</section>
		</Format>
	);
};

export default Page;

interface IParams extends ParsedUrlQuery {
	postId: string;
}

// const getPost = async (postId: string | string[] | number) =>
// 	await (await fetch(`http://localhost:3000/api/posts/${postId}`)).json();

export const getServerSideProps: GetServerSideProps = async context => {
	const queryClient = new QueryClient();
	const { postId } = context.params as IParams;

	await queryClient.prefetchQuery<Post>(['post', postId], () =>
		getPostById(postId ? postId : 1),
	);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
};

// export const getServerSideProps: GetServerSideProps = async (context) => {

//     const baseURL = "http://localhost:3000/api/posts/";
//     const { postId } = context.params as IParams;
//     const res = await fetch(`${baseURL}${postId}`);
//     const posts: Post = await res.json();

//     return{
//         props: {
//             posts
//         }
//     }
// }

// export const getStaticProps: GetStaticProps = async context => {
// 	const queryClient = new QueryClient();
// 	const { postId } = context.params as IParams;

// 	await queryClient.prefetchQuery<Post>(['post'], () =>
// 		getPostById(postId ? postId : 1),
// 	);
// 	return {
// 		props: {
// 			dehydratedState: dehydrate(queryClient),
// 		},
// 	};
// };

// export const getStaticPaths: GetStaticPaths = async () => {
// 	//const baseURL = process.env.NEXT_PUBLIC_API_URL+"/posts";

// 	//const res = await fetch(`${baseURL}`);
// 	//const posts: Post[] = await res.json();
// 	const posts: Post[] = await getPostAll();

// 	const paths = posts.map(value => {
// 		return {
// 			params: {
// 				postId: value.id.toString(),
// 			},
// 		};
// 	});

// 	return {
// 		paths,
// 		fallback: false,
// 	};
// };

// export const getStaticProps: GetStaticProps<{ posts: Post }> = async (context) => {
// // export async function getStaticProps: GetStaticProps<{posts:Post[]}>(){

//     const baseURL = "http://localhost:3000/api/posts/";
//     const { postId } = context.params as IParams;
//     const res = await fetch(`${baseURL}${postId}`);
//     const posts: Post = await res.json();

//     return{
//         props: {
//             posts
//         }
//     }
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//     const baseURL = "http://localhost:3000/api/posts/";

//     const res = await fetch(`${baseURL}`);
//     const posts: Post[] = await res.json();

//     const paths = posts.map((value)=>{
//         return{
//             params:{
//                 postId: value.id.toString()
//             }
//         }
//     })

//     return {
//         paths,
//         fallback:false,
//     };
// }
