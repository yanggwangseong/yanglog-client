import Image from 'next/image';
import Link from 'next/link';
import Author from '../_child/author';
import { FC } from 'react';
import { PostType } from '@/shared/interfaces/home.interface';

const section2: FC<{ posts: PostType[] }> = posts => {
	const { posts: data } = posts;

	return (
		<div className="container mx-auto md:px-20 py-10">
			<h1 className="font-bold text-5xl py-12 text-center">최신 게시물</h1>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
				{data &&
					data.map((value: PostType, index: number) => (
						<Post data={value} key={index}></Post>
					))}
			</div>
		</div>
	);
};

const Post: FC<{ data: PostType }> = ({ data }) => {
	const { id, title, subtitle, description, category, img, published, author } =
		data;

	return (
		<div className="item">
			<div className="images">
				<Link href={`/posts/${id}`}>
					<a>
						<Image
							src={img || '/'}
							className=" rounded"
							width={500}
							height={350}
							alt={'/'}
						></Image>
					</a>
				</Link>
			</div>
			<div className="info flex justify-center flex-col py-4">
				<div className="cat">
					<Link href={`/posts/${id}`}>
						<a className=" text-orange-600 hover:text-orange-800">
							{category || null}
						</a>
					</Link>
					<Link href={`/posts/${id}`}>
						<a className=" text-gray-800 hover:text-gray-600">
							- {published.slice(0, 7) || null}
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
				<p className=" text-gray-500 py-3">{subtitle || null}</p>
				{author ? <Author author={author}></Author> : null}
			</div>
		</div>
	);
};

export default section2;
