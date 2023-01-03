import { ImFacebook, ImTwitter, ImYoutube } from 'react-icons/im';
import Link from 'next/link';
import Newslatter from '../_child/newslatter';
const footer = () => {
	const bg = {
		// backgroundImage : "url('/images/footer.png')",
		// backgroundRepeat: "no-repeat",
		// backgroundPosition: "bottom left",
	};
	return (
		<footer className="bg-violet-600" style={bg}>
			<Newslatter></Newslatter>
			<div className="container mx-auto flex justify-center py-12">
				<div className="py-5">
					<div className="flex gap-6 justify-center">
						<Link href={'/'}>
							<a>
								<ImFacebook color="#ffffff" />
							</a>
						</Link>
						<Link href={'/'}>
							<a>
								<ImTwitter color="#ffffff" />
							</a>
						</Link>
						<Link href={'/'}>
							<a>
								<ImYoutube color="#ffffff" />
							</a>
						</Link>
					</div>
					<p className="py-5 text-white">
						Copyright ©2022 All rights reserved | This template is made with by
						Daily Tuition
					</p>
					<p className="text-white text-center">Terms & Condition</p>
				</div>
			</div>
		</footer>
	);
};

export default footer;
