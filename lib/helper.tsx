import { AppProps } from "next/app";

interface params{
    params:string;
}

const baseURL = "http://localhost:3000/";

const getPost = async({params}: params) => {
    const res = await fetch(`${baseURL}${params}`);
    const posts = await res.json();

    return posts;
}


export default getPost;