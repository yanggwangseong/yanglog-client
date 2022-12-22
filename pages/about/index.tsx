import type { NextPage } from 'next'
import { useRecoilState } from 'recoil';
import { todoAtom } from '../../atoms';
import Listabout from '../../components/_child/about';

const About: NextPage = () => {

  const [todo, setTodo] = useRecoilState(todoAtom);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  }

    return (
        <div>
          <input type="text" onChange={handleChange}></input>
          <h1>{todo}</h1>
          <Listabout></Listabout>
        </div>
    );
}

export default About;