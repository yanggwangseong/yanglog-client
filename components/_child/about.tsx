import { useRecoilValue } from "recoil";
import { todoAtom } from "../../atoms";



const Listabout = () => {
    const todo = useRecoilValue(todoAtom);

    return(
        <div>
            <h2>Listabout: {todo}</h2>
        </div>
    )
}
export default Listabout;