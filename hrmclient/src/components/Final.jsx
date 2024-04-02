import Land_nav from "./Land_nav";
import Land_footer from "./Land_footer";
import { BrowserRouter as Router, Route, Routes,Link} from "react-router-dom";
import Login from "./Login";
function Final(){
    return(
        <>
            <Land_nav/>
            <div style={{display:"flex",justifyContent:"center"}}><button><Link to={"/login"}>Login</Link></button></div>
            <Land_footer/>
        </>
    )
}
export default Final;