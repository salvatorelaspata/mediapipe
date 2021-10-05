import React from 'react'
import { Link } from 'react-router-dom';

interface NavBarProp {

}
const NavBar: React.FC<NavBarProp> = () => {
    return (
        <nav className="mobile-menu">
            <label htmlFor="show-menu" className="show-menu"><span></span><div className="lines"></div></label>
            <input type="checkbox" id="show-menu"></input>
            <ul id="menu">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/mediapipe">mediapipe</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar
