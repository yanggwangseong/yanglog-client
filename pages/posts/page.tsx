import type { NextPage } from 'next'
import Format from '../../layout/format';
import Author from '../../components/_child/author';
const page: NextPage = () => {
    return (
        <Format>
          <section className=" container mx-auto md:px-2 py-16 w-1/2">
            <div className=" flex justify-center ">
                <Author></Author>
            </div>
            <div className="post py-10">
                <h1 className=" font-bold text-4xl text-center pb-5">Your most unhappy customers are your greatest source of learning</h1>
                <p className=" text-gray-500 text-xl text-center">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
            </div>
          </section>
        </Format>
    );
}

export default page;