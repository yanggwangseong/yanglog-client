import Image from "next/image";
import Link from "next/link";
import Author from "../_child/author";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/css';

const section3 = () => {
    SwiperCore.use([Autoplay]);
    return(
        <div className="container mx-auto md:px-20 py-10">
            <h1 className="font-bold text-4xl py-12 text-center">인기 게시물</h1>
            <Swiper
                slidesPerView={2}
                loop={true}
                autoplay={{
                    delay:2000
                }}
                >
                <SwiperSlide>{Post()}</SwiperSlide>
                <SwiperSlide>{Post()}</SwiperSlide>
                <SwiperSlide>{Post()}</SwiperSlide>
                <SwiperSlide>{Post()}</SwiperSlide>
            </Swiper>
        </div>
    )
}

const Post = () =>{
    return (
        <div className="grid">
            <div className="images">
                <Link href={"/"}><a><Image src={"/images/img1.jpg"} width={600} height={400}></Image></a></Link>
            </div>
            <div className="info flex justify-center flex-col py-4">
                <div className="cat">
                    <Link href={"/"}><a className=" text-orange-600 hover:text-orange-800">Business, Travel</a></Link>
                    <Link href={"/"}><a className=" text-gray-800 hover:text-gray-600">- July 3, 2022</a></Link>
                </div>
                <div className="title">
                    <Link href={"/"}><a className=" text-3xl md:text-4xl font-bold text-gray-800 hover:text-gray-600">Your most unhappy customers are your greatest source of learning</a></Link>
                </div>
                <p className=" text-gray-500 py-3">
                    Even the all-powerful poining has no control about the blind texts it is an almost
                    unorthographic life One day however a small line of blind text by the name of Lorem
                    lpsum decided to leave for the far World of Grammar.
                </p>
                <Author></Author>
            </div>
        </div>
    );
}

export default section3;