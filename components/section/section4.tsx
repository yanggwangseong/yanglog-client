import Image from "next/image";
import Link from "next/link";
import Author from "../_child/author";
import Spinner from "../_child/spinner";
import Error from "../_child/error";
import useSWR from 'swr';


interface PostsProps {
    id:Number;
    title:string;
    subtitle:string;
    category:string;
    img:string;
    description:string;
    published:string;
    author:{
        name:string;
        img:string;
        designation:string;
    }
}

const section4 = () => {
    

    const baseURL = "http://localhost:3000/";
    const response = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());
    const { data, isLoading, error } = useSWR<PostsProps[],Error>(`${baseURL}api/popular`,response);
    
    if(isLoading) return <Spinner></Spinner>;
    if(error) return <Error></Error>

    console.log(data);
    return(
        <section className="container mx-auto md:px-20 py-16">
            <div className="grid lg:grid-cols-2">
                <div className="item">
                    <h1 className="font-bold text-4xl py-12 text-center">Business</h1>
                    <div className="flex flex-col gap-6">
                        {/* { Post() } */}
                        { data && data[1] ? <Post data={data[1]}></Post> : null}
                        { data && data[2] ? <Post data={data[2]}></Post> : null}
                        { data && data[3] ? <Post data={data[3]}></Post> : null}
                    </div>
                </div>
                <div className="item">
                    <h1 className="font-bold text-4xl py-12 text-center">Travel</h1>
                    <div className="flex flex-col gap-6">
                        {/* { Post() } */}
                        { data && data[4] ? <Post data={data[4]}></Post> : null}
                        { data && data[5] ? <Post data={data[5]}></Post> : null}
                        { data && data[6] ? <Post data={data[6]}></Post> : null}
                    </div>
                </div>
            </div>
        </section>
    )
}
const Post = ({data}:{data:PostsProps}) =>{

    const {id, title, subtitle, description, category, img, published, author } = data;

    return (
        <div className="flex gap-5">
            <div className="image flex flex-col justify-start">
                <Link href={"/"}><a><Image src={img || "/"} className="rounded" width={300} height={250}></Image></a></Link>
            </div>
            <div className="info flex justify-center flex-col">
                <div className="cat">
                    <Link href={"/"}><a className=" text-orange-600 hover:text-orange-800">{category || null}</a></Link>
                    <Link href={"/"}><a className=" text-gray-800 hover:text-gray-600">- {published || null}</a></Link>
                </div>
                <div className="title">
                    <Link href={"/"}><a className=" text-xl font-bold text-gray-800 hover:text-gray-600">{title || null}</a></Link>
                </div>
                { author ? <Author></Author> : null }
            </div>
        </div>
    )
}



export default section4;