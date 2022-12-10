import useSWR from 'swr';



const baseURL = "http://localhost:3000/";

const response = (...args: Parameters<typeof fetch>) => 
    fetch(...args).then((res) => res.json());

const fetcher = async(endpoint:string) => {
    const { data, error } = useSWR(`${baseURL}${endpoint}`,response);
    
    return {
        data
    }
}


export default fetcher;