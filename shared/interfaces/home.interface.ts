export interface HomePostType {
	trending: PostType[];
	posts: PostType[];
	popular: PostType[];
	gptPosts: PostType[];
}

export interface PostType {
	id: string;
	title: string;
	subtitle: string;
	category: string;
	img: string;
	description: string;
	published: string;
	author: ProfileType;
	likes?: number;
	mylike?: number;
}

export interface ProfileType {
	name: string;
	img: string;
	designation: string;
}

export interface SearchType {
	list: PostType[];
	count: number;
}
