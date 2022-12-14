import Image from "next/image";
import Link from "next/link";
import Author from "../_child/author";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/css';
import Spinner from "../_child/spinner";
import Error from "../_child/error";
import fetcher from "../../lib/fetcher";


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

const section1 = () => {

    //SwiperCore.use([Autoplay]);

    const { data, isLoading, error } = fetcher("api/trending");
    if(isLoading) return <Spinner></Spinner>;
    if(error) return <Error></Error>

    const bg = {
        background: "url('/images/banner.jpg')no-repeat",
        backgroundPosition:"right",
    }
    return (
        <section className="py-16" style={bg}>
            <div className="container mx-auto md:px-20">
                <h1 className="font-bold text-4xl pb-12 text-center">Trending</h1>

                <Swiper
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay:2000
                    }}
                    >
                    {/* <SwiperSlide>{Slide()}</SwiperSlide>
                    <SwiperSlide>{Slide()}</SwiperSlide>
                    <SwiperSlide>{Slide()}</SwiperSlide>
                    <SwiperSlide>{Slide()}</SwiperSlide> */}
                    {
                        data&&
                        data.map((value:PostsProps,index:number) =>(
                            <SwiperSlide key={index}><Slide data={value}></Slide></SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </section>
    );
}

const Slide = ({data}:{data:PostsProps}) => {

    const {id, title, subtitle, description, category, img, published, author } = data;

    return(
        <div className="grid md:grid-cols-2">
            <div className="image">
                <Link href={`/posts/${id}`}><a><Image src={img || "/"} width={600} height={600}></Image></a></Link>
            </div>
            <div className="info flex justify-center flex-col sm:ml-10">
                <div className="cat">
                    <Link href={`/posts/${id}`}><a className=" text-orange-600 hover:text-orange-800">{category || null}</a></Link>
                    <Link href={`/posts/${id}`}><a className=" text-gray-800 hover:text-gray-600">- {published || null}</a></Link>
                </div>
                <div className="title">
                    <Link href={`/posts/${id}`}><a className=" text-3xl md:text-4xl lg:text-6xl font-bold text-gray-800 hover:text-gray-600">{title || null}</a></Link>
                </div>
                <p className=" text-gray-500 py-3">
                    {description || null}
                </p>
                { author ? <Author author={author}></Author> : null }
            </div>
        </div>
    )
}

export default section1;