import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Author from './author';
import fetcher from '../../lib/fetcher';
import Spinner from './spinner';
import Error from './error';

interface PostsProps {
	id: Number;
	title: string;
	subtitle: string;
	category: string;
	img: string;
	description: string;
	published: string;
	author: {
		name: string;
		img: string;
		designation: string;
	};
}

const ralated = () => {
	const { data, isLoading, error } = fetcher('api/posts');
	if (isLoading) return <Spinner></Spinner>;
	if (error) return <Error></Error>;

	return (
		<section className="pt-20">
			<h1 className="font-bold text-4xl py-10">Related</h1>
			<div className="flex flex-col gap-10">
				{data &&
					data.map((value: PostsProps, index: number) => (
						<Post data={value} key={index}></Post>
					))}
			</div>

			<nav className="w-full" aria-label="Page navigation example">
				<ul className="flex items-center -space-x-px h-10 text-base">
					<li>
						<a
							href="#"
							className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							<span className="sr-only">Previous</span>
							<svg
								className="w-3 h-3"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 6 10"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 1 1 5l4 4"
								/>
							</svg>
						</a>
					</li>
					<li>
						<a
							href="#"
							className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							1
						</a>
					</li>
					<li>
						<a
							href="#"
							className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							2
						</a>
					</li>
					<li>
						<a
							href="#"
							aria-current="page"
							className="z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
						>
							3
						</a>
					</li>
					<li>
						<a
							href="#"
							className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							4
						</a>
					</li>
					<li>
						<a
							href="#"
							className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							5
						</a>
					</li>
					<li>
						<a
							href="#"
							className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							<span className="sr-only">Next</span>
							<svg
								className="w-3 h-3"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 6 10"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="m1 9 4-4-4-4"
								/>
							</svg>
						</a>
					</li>
				</ul>
			</nav>
		</section>
	);
};

function Post({ data }: { data: PostsProps }) {
	const { id, title, subtitle, description, category, img, published, author } =
		data;

	return (
		<div className="flex gap-5">
			<div className="image flex flex-col justify-start">
				<Link href={`/posts/${id}`}>
					<a>
						<Image
							src={img || '/'}
							className="rounded"
							width={300}
							height={200}
							alt={''}
						></Image>
					</a>
				</Link>
			</div>
			<div className="info flex justify-center flex-col">
				<div className="cat">
					<Link href={`/posts/${id}`}>
						<a className=" text-orange-600 hover:text-orange-800">
							{category || null}
						</a>
					</Link>
					<Link href={`/posts/${id}`}>
						<a className=" text-gray-800 hover:text-gray-600">
							- {published || null}
						</a>
					</Link>
				</div>
				<div className="title">
					<Link href={`/posts/${id}`}>
						<a className=" text-xl font-bold text-gray-800 hover:text-gray-600">
							{title || null}
						</a>
					</Link>
				</div>
				{author ? <Author author={author}></Author> : null}
			</div>
		</div>
	);
}

export default ralated;
