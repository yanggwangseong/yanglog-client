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
	const { handleKeyDown, handleSearch, isSuccess, data } = useSearch();

	return (
		<Format title="검색페이지">
			{isSuccess && (
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
					<div className="mt-4 mb-16">
						총 {data?.count}개의 포스트를 찾았습니다.
					</div>
					{data?.list.map(item => (
						<div
							className="mb-24 flex border-b-gray-200 border-b-2 pb-12"
							key={item.id}
						>
							<div>
								<div className="images">
									<Link href={`/posts/${item.id}`}>
										<a>
											<Image
												src={item.img}
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
										<Link href={`/posts/${item.id}`}>
											<a className=" text-orange-600 hover:text-orange-800">
												{item.category || null}
											</a>
										</Link>
										<Link href={`/posts/${item.id}`}>
											<a className=" text-gray-800 hover:text-gray-600">
												- {item.published.slice(0, 7) || null}
											</a>
										</Link>
										<Link href={`/posts/${item.id}`}>
											<a className=" text-gray-800 hover:text-gray-600 text-2xl ml-5">
												0개의 댓글
											</a>
										</Link>
									</div>
									<div className="title">
										<Link href={`/posts/${item.id}`}>
											<a className=" text-xl font-bold text-gray-800 hover:text-gray-600">
												{item.title || null}
											</a>
										</Link>
									</div>
									<p className=" text-gray-500 py-3">{item.subtitle || null}</p>
									{item.author ? <Author author={item.author}></Author> : null}
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</Format>
	);
};

export default Search;
