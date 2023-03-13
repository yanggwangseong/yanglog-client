import Field from '@/components/ui/field/Field';
import Format from '@/components/ui/layout/format';
import { useRouter } from 'next/router';
import React, { FC, FormEvent } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import styles from './Search.module.scss';
import { useSearch } from '@/hooks/useSearch';
import Link from 'next/link';
import Image from 'next/image';
import Author from '@/components/_child/author';

const Search: FC = () => {
	const { handleKeyDown, handleSearch } = useSearch();

	// const handleSubmit = (e: FormEvent) => {
	// 	e.preventDefault();

	// 	const router = useRouter();
	// 	router.push('/search/your');
	// };
	const id = 'b6092d86-934c-44c7-a824-9a703e959be1';
	const category = 'Javscript';
	const title =
		'Your most unhappy customers are your greatest source of learning';
	const subtitle =
		'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.';
	const author = {
		designation: 'admin',
		img: '/images/author/profile.jpeg',
		name: '양광성',
	};
	const published = '2023-07-03T06:16:02.413Z';
	return (
		<Format title="검색페이지">
			<div className={styles.search_container}>
				<div>
					<label>
						<Field
							className="w-full h-14 px-3 py-3 text-2xl"
							Icon={IoSearchOutline}
							IconSize={30}
							onKeyDown={handleKeyDown}
							onChange={handleSearch}
						></Field>
					</label>
				</div>
				<div className="mt-4 mb-16">총 2871개의 포스트를 찾았습니다.</div>
				<div className="mb-24 flex border-b-gray-200 border-b-2 pb-12">
					<div>
						<div className="images">
							<Link href={``}>
								<a>
									<Image
										src={'/images/articles/posts/img6.jpg'}
										className=" rounded"
										width={768}
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
								<Link href={`/posts/${id}`}>
									<a className=" text-gray-800 hover:text-gray-600 text-2xl ml-5">
										0개의 댓글
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
				</div>

				<div className="mb-6 flex">
					<div>
						<div className="images">
							<Link href={``}>
								<a>
									<Image
										src={'/images/articles/posts/img6.jpg'}
										className=" rounded"
										width={768}
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
								<Link href={`/posts/${id}`}>
									<a className=" text-gray-800 hover:text-gray-600 text-2xl ml-5">
										0개의 댓글
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
				</div>
			</div>
		</Format>
	);
};

export default Search;
