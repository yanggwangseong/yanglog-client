import { ImFacebook, ImTwitter, ImYoutube } from "react-icons/im";
import Link from 'next/link';

const header = () => {
    return (
        <header className="bg-violet-600">
            <div className="xl:container xl:mx-auto flex flex-col items-center sm:flex-row sm:justify-between text-center py-3">
                <div className="md:flex-none w-96 order-2 sm:order-1 flex justify-center py-4 sm:py-0">
                    <input type="text" className="input-text" placeholder="Search..."/>
                </div>
                <div className="shrink w-80 sm:order-2">
                    <Link href={"/"}>
                        <a className="font-bold uppercase text-3xl text-white">YangLog</a>
                    </Link>
                </div>
                <div className="w-96 order-3 flex justify-center">
                    <div className="flex gap-6">
                        {/* <Link href={"/"}>
                            <a><ImFacebook color="#ffffff"/></a>
                        </Link>
                        <Link href={"/"}>
                            <a><ImTwitter color="#ffffff"/></a>
                        </Link>
                        <Link href={"/"}>
                            <a><ImYoutube color="#ffffff"/></a>
                        </Link> */}
                        <Link href={"/login"}>
                            <a className="text-white">로그인</a>
                        </Link>
                        <Link href={"/signup"}>
                            <a className="text-white">회원가입</a>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default header;