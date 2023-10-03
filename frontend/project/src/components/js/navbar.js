import "../css/navbar.css"
import Lottie from "react-lottie"
import animationData from "../../static/lotties/animation_llxlv4an.json"
import { NavLink } from "react-router-dom";

function Navbar() {

    let type = localStorage.getItem("type");
    let email = localStorage.getItem("email");

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const logout = async (e)=>{
        localStorage.clear();
      };

    return (
        <header className='navbar'>
            <div className='navbar__title navbar__item'>
                <a href="/dashboard">
                    <Lottie 
                        options={defaultOptions}
                        height={50}
                        width={50}
                    />
                </a>
            </div>
            <div className='navbar__title navbar__item'>Welcome {email}!</div>
            {/* <b2 className="headingg">MyClinic</b2> */}
            <NavLink className='navbar__item' to="/booking" exact> Book </NavLink>
            {/* <NavLink className='navbar__item' to="/moniter" exact> Moniter </NavLink>
            <NavLink className='navbar__item' to="/near" exact> Near You </NavLink> */}
            {type=="Patient" && <NavLink className='navbar__item' to="/search" exact> Search </NavLink>}
            <NavLink className='navbar__item' to="/profile" exact> Profile </NavLink>
            <NavLink className='navbar__item' to="/" onClick={logout} exact> Logout </NavLink>

        </header>
    );
}

export default Navbar;