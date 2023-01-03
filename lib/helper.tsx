import { AppProps } from 'next/app';

const baseURL = 'http://localhost:3000/';

const getPost = async ({ params }: { params: Number }) => {
	const res = await fetch(`${baseURL}${params}`);
	const posts = await res.json();

	return posts;
};

export default getPost;
