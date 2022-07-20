import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Head from "next/head";

type AppLayoutProps = {
    children: React.ReactNode;
};

const format = ({children}:AppLayoutProps) => {
    return (
        <>
            <Head>
                <title>yanglog</title>
                <meta name="description" content="yanglog" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header></Header>
                <main>{children}</main>
            <Footer></Footer>
        </>
    );
}

export default format;