import type { NextPage } from 'next'
import React,{ useState } from 'react';
import { useMutation } from 'react-query';
import { loginUser } from '../../api/userService';

interface User {
  email: string;
  password: string;
}

const Login: NextPage = () => {

    const [inputs, setInputs] = React.useState<User>({
      email: '',
      password:'',
    })

    const { email, password } = inputs;

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      const { value, name } = e.target;
      setInputs({
        ...inputs,
        [name]: value
      });
      
    };

    const loginMutation = useMutation(({email,password}:User)=>loginUser({email,password}),{
      onMutate: (variable) => {
        console.log("onMutate", variable);
        // variable : {loginId: 'xxx', password; 'xxx'}
      },
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    })
    
    const handleSubmit = (e:React.SyntheticEvent) => {
      e.preventDefault();
      const target = e.target as typeof e.target & {
        email: { value:string };
        password: { value:string };
      };  
      const email = target.email.value;
      const password = target.password.value;
      
      
      loginMutation.mutate({email,password});
    }

    return (
        <form onSubmit={handleSubmit}>
          <div className='container'>
            <div>
              <input 
                className='border-solid border border-black'
                name="email"
                type="text"
                onChange={handleChange}
                value={email}
              ></input>
            </div>
            <div>
              <input
                className='border-solid border border-black'
                name="password"
                type="text"
                onChange={handleChange}
                value={password}
                ></input>
            </div>
            <div>
              <button className='bg-blue-500 text-white p-2' type="submit">로그인</button>
            </div>
          </div>
        </form>
    );
}

export default Login;