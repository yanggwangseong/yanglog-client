import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Head from 'next/head';

type AppLayoutProps = {
	children: React.ReactNode;
	title: string | undefined;
};

const format = ({ children, title }: AppLayoutProps) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content="yanglog" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header></Header>
			<main>{children}</main>
			<Footer></Footer>
		</>
	);
};

export default format;
