import Image from 'next/image';
import Link from 'next/link';

interface authorType {
	name: string;
	img: string;
	designation: string;
}
const author = ({ author }: { author: authorType }) => {
	const { name, img, designation } = author;
	if (!name && !img) return <></>;

	return (
		<div className="author flex py-5">
			<Image
				src={img || '/'}
				width={60}
				height={60}
				className="rounded-full"
				alt={'/'}
			></Image>
			<div className="flex flex-col justify-center px-4">
				<Link href={'/'}>
					<a className="text-md font-bold text-gray-800 hover:text-gray-600">
						{name || null}
					</a>
				</Link>
				<span className="text-sm text-gray-500">{designation || null}</span>
			</div>
		</div>
	);
};

export default author;
