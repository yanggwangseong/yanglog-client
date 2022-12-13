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

const baseURL = "http://localhost:3000/";

const response = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

const fetcher = (endpoint:string) => {

    const { data, isLoading, error } = useSWR<PostsProps[],Error>(`${baseURL}${endpoint}`,response);
    
    return {
        data: data,
        isLoading: isLoading,
        error : error
    }
}


export default fetcher;