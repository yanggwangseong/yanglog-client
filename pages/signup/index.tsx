import { NextPage } from "next";


const Signup: NextPage = () => {
    
    return (
        <form >
          <div className='container'>
            <div>
                이메일
            </div>
            <div>
              <input 
                className='border-solid border border-black'
                name="email"
                type="text"
                
              ></input>
            </div>
            <div>
                비밀번호
            </div>
            <div>
              <input
                className='border-solid border border-black'
                name="password"
                type="text"
                
                ></input>
            </div>
            <div>
                이름
            </div>
            <div>
            <input
                className='border-solid border border-black'
                name="name"
                type="text"
                ></input>
            </div>
            <div>
              <button className='bg-blue-500 text-white p-2' type="submit">회원가입</button>
            </div>
          </div>
        </form>
    );
}

export default Signup; 