import ToastMessage from '@/components/toast';
import { PostService } from '@/services/post/post.service';
import { useRouter } from 'next/router';
import React from 'react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useQuery } from 'react-query';

interface toastFunc {
	(type: 'success' | 'error' | 'info' | 'warning', message: string): void;
}

export const useSearch = () => {
	const [searchTerm, setSearchTerm] = useState<string>('');

	const { data, isSuccess, refetch } = useQuery(
		['search'],
		async () => await PostService.searchPosts(searchTerm),
		{
			enabled: false,
			refetchOnMount: false, // 변경: 첫 렌더링 시 쿼리를 실행하지 않도록 변경
		},
	);

	const router = useRouter();
	const notify: toastFunc = React.useCallback((type, message) => {
		ToastMessage({ type, message });
	}, []);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (!searchTerm) {
			notify('error', '검색어를 입력 해주세요!');
			return;
		}
		router.push(`/search/${searchTerm}`);
		refetch();
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleSubmit(event);
		}
	};

	return {
		handleSearch,
		handleSubmit,
		handleKeyDown,
		isSuccess,
		data,
		setSearchTerm,
		searchTerm,
	};
};
