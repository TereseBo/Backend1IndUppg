 import { Link } from "react-router-dom";

export default function LinkBox({target, text}){
    return(
        <div>
            <Link to={target}>{text}</Link>
        </div>
    )
}
