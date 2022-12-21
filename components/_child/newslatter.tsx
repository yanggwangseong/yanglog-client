import Image from "next/image";
import Link from "next/link";

const newslatter = () => {
    return(
        <section className="bg-violet-600 mt-20">
            <div className="container mx-auto md:px-20 py-16 text-center">
                <h1 className=" font-bold text-3xl text-white">Subscribe Newslatter</h1>

                <div className=" py-4">
                    <input type="text" className="shadow border rounded w-9/12 py-3 px-3 text-gray-700 
                    focus:outline-none focus:shadow-outline" placeholder="Enter Your Email"/>
                </div>
                <button className="bg-green-500 px-20 py-3 rounded-full text-white text-xl">
                    Subscribe
                </button>
            </div>
        </section>
    )
}

export default newslatter;