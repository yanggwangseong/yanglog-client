import type { NextPage } from 'next'
import Format from '../../layout/format';

const New: NextPage = () => {

    return(
        <Format title="Yanglog글쓰기">
            <div className="container mx-auto md:px-20">
                <div>
                    <h1 className="font-bold text-2xl py-12">제목</h1>
                </div>
                <div className="w-full">
                    <input 
                        className="w-full border-solid border border-black"
                        name="subject"
                        type="text"
                    ></input>
                </div>
                <div>
                    <h1 className="font-bold text-2xl py-12">부제목</h1>
                </div>
                <div className="w-full">
                    <input 
                        className="w-full border-solid border border-black"
                        name="SubSubject"
                        type="text"
                    ></input>
                </div>
                <div>
                    <h1 className="font-bold text-2xl py-12">내용</h1>
                </div>
                <div className="w-full">
                    <textarea
                        className="w-full border-solid border border-black"
                    ></textarea>
                </div>
            </div>
        </Format>
    );
}

export default New;