 import { Link } from "react-router-dom";
//Styles
import "./linkbox.scss";

export default function LinkBox({target, text}){
    
    return(
        <div className="linkbox">
            <Link to={target}>{text}</Link>
        </div>
    )
}
