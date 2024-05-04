import Author from '@/components/_child/author';
import Format from '@/components/ui/layout/format';
import React, { FC } from 'react';
import Image from 'next/image';
import Ralated from '@/components/_child/ralated';
import Comment from './comment/Comment';
import { CommentType } from '@/shared/interfaces/comment.interface';
import { PostType } from '@/shared/interfaces/home.interface';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { Login, loginAtom } from 'atoms/loginAtom';
import { useMutation, useQueryClient } from 'react-query';
import { PostService } from '@/services/post/post.service';
import ToastMessage from '@/components/toast';
import axios from 'axios';
import { useRouter } from 'next/router';

const Post: FC<{ posts: PostType; comments: CommentType[] }> = ({
	posts,
	comments,
}) => {
	const {
		id,
		title,
		subtitle,
		description,
		category,
		img,
		published,
		author,
		likes,
		mylike,
	} = posts;

	const router = useRouter();

	const [LoginState] = useRecoilState<Login>(loginAtom);
	const queryClient = useQueryClient();

	const postLikes = useMutation(
		['postLikes'],
		() => PostService.updateLikesPostId(id),
		{
			onSuccess: data => {
				if (data) {
					notify('success', '게시글을 좋아요 하였습니다.');
				} else {
					notify('success', '게시글 좋아요 취소되었습니다.');
				}
				//notify('success', '댓글이 작성 되었습니다.');
				queryClient.invalidateQueries(['post', id]);
			},
			onError: error => {
				if (axios.isAxiosError(error)) {
					notify('error', error.response?.data.message);
				} else {
					console.error(error);
				}
			},
		},
	);

	const handdlePostLikes = () => {
		if (!LoginState.loginState) {
			if (confirm('로그인이 필요합니다.')) {
				router.push('/login');
			}
		} else {
			postLikes.mutate();
		}
	};

	interface toastFunc {
		(type: 'success' | 'error' | 'info' | 'warning', message: string): void;
	}

	const notify: toastFunc = React.useCallback((type, message) => {
		ToastMessage({ type, message });
	}, []);

	return (
		<Format title={title}>
			<section className="container mx-auto md:px-2 py-16 lg:w-1/2">
				<div className=" flex justify-center ">
					{author ? <Author author={author}></Author> : null}
				</div>
				<div className="flex justify-end">
					<div>
						{LoginState.loginState === true && mylike === 1 ? (
							<FaHeart
								color="red"
								className="cursor-pointer"
								onClick={handdlePostLikes}
							></FaHeart>
						) : (
							<FaRegHeart
								className="cursor-pointer"
								onClick={handdlePostLikes}
							></FaRegHeart>
						)}
					</div>
					<div className="ml-5">{likes}</div>
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
