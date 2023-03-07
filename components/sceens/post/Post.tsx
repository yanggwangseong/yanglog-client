import Author from '@/components/_child/author';
import Format from '@/components/ui/layout/format';
import React, { FC } from 'react';
import Image from 'next/image';
import Ralated from '@/components/_child/ralated';
import Comment from './comment/Comment';
import { Post } from '@/shared/interfaces/post';
import { CommentType } from '@/shared/interfaces/comment.interface';

const Post: FC<{ posts: Post; comments: CommentType[] }> = ({
	posts,
	comments,
}) => {
	const { id, title, subtitle, description, category, img, published, author } =
		posts;
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
				<Comment comments={comments}></Comment>
			</section>
		</Format>
	);
};

export default Post;
