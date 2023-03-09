import type {
	GetServerSideProps,
	GetStaticPaths,
	GetStaticProps,
	InferGetStaticPropsType,
	NextPage,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import { dehydrate, QueryClient, useQuery, useQueryClient } from 'react-query';
import Error from '../../components/_child/error';
import Spinner from '../../components/_child/spinner';
import { getPostById, getPostAll } from '../../api/postService';
import Post from '@/components/sceens/post/Post';
import { CommentType } from '@/shared/interfaces/comment.interface';
import { CommentService } from '@/services/comment/comment.service';
import { PostType } from '@/shared/interfaces/home.interface';
import { PostService } from '@/services/post/post.service';

const PostsPage: NextPage<{ postId: string }> = ({ postId }) => {
	//const router = useRouter();
	//const { postId } = router.query;
	//if (!postId) return null;
	//const { data, isLoading, isError } = useQuery(["post"], () => getPost(postId ? postId : 1));
	const { data, isLoading, isError } = useQuery(['post', postId], () =>
		PostService.getPostById(postId),
	);

	const {
		data: commentData,
		isLoading: commentLoading,
		isError: commentError,
	} = useQuery(['comment', postId], () => CommentService.getComments(postId));

	//const {id, title, subtitle, description, category, img, published, author } = posts;

	if (isLoading || commentLoading) {
		return <Spinner></Spinner>;
	}

	if (isError || commentError) {
		return <Error></Error>;
	}

	if (!data || !commentData) {
		return null;
	}

	// const { id, title, subtitle, description, category, img, published, author } =
	// 	data;
	//const {id, title, subtitle, description, category, img, published, author }:Post = data;
	//const title = data?.title;
	//const author = data?.author;
	//const subtitle = data?.subtitle;
	//const img = data?.img;
	//const description = data?.description;

	return <Post posts={data} comments={commentData}></Post>;
};

export default PostsPage;

interface IParams extends ParsedUrlQuery {
	postId: string;
}

// const getPost = async (postId: string | string[] | number) =>
// 	await (await fetch(`http://localhost:3000/api/posts/${postId}`)).json();

export const getServerSideProps: GetServerSideProps = async context => {
	const queryClient = new QueryClient();
	const { postId } = context.params as IParams;

	await queryClient.prefetchQuery<PostType>(['post', postId], () =>
		PostService.getPostById(postId),
	);

	await queryClient.prefetchQuery<CommentType[]>(['comment', postId], () =>
		CommentService.getComments(postId),
	);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			postId,
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

// 	await queryClient.prefetchQuery<PostType>(['post'], () =>
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
