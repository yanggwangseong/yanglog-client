import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Image from 'next/image';
import Format from '../../layout/format';
import Author from '../../components/_child/author';
import Ralated from "../../components/_child/ralated"
import getPost from '../../lib/helper';
import { ParsedUrlQuery } from 'querystring';


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

const page = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
    
    const {id, title, subtitle, description, category, img, published, author } = posts;
    
    return (
        <Format>
          <section className=" container mx-auto md:px-2 py-16 w-1/2">
            <div className=" flex justify-center ">
                { author ? <Author></Author> : null }
            </div>
            <div className="post py-10">
                <h1 className=" font-bold text-4xl text-center pb-5">{title || null}</h1>
                <p className=" text-gray-500 text-xl text-center">{subtitle || null}</p>
                <div className="py-10">
                  <Image src={img || "/"} width={900} height = {600}></Image>
                </div>
                <div className="content text-gray-600 text-lg flex flex-col gap-4">
                  {description || null}
                </div>
            </div>
            <Ralated></Ralated>
          </section>
        </Format>
    );
}

export default page;

interface IParams extends ParsedUrlQuery {
    postId: string
}

export const getStaticProps: GetStaticProps<{ posts: PostsProps }> = async (context) => {
// export async function getStaticProps: GetStaticProps<{posts:PostsProps[]}>(){
    
    const baseURL = "http://localhost:3000/api/posts/";
    const { postId } = context.params as IParams;
    const res = await fetch(`${baseURL}${postId}`);
    const posts: PostsProps = await res.json();
    
    return{
        props: {
            posts
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const baseURL = "http://localhost:3000/api/posts/";

    const res = await fetch(`${baseURL}`);
    const posts: PostsProps[] = await res.json();
    
    const paths = posts.map((value)=>{
        return{
            params:{
                postId: value.id.toString()
            }
        }
    })

    return {
        paths,
        fallback:false,
    };
} 