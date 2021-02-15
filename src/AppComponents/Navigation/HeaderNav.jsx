import React from 'react';
import {BiMenuAltRight} from 'react-icons/bi';
import {Link} from 'react-router-dom';
import Cookie from "js-cookie";
import Logo from "../../images/logo.jpg"
export default function HeaderNav() {
    return (
        <div>
            {/* ============ NAVBAR SECTION==========  */}
            <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="#">
                    {' '}
                    <img src={Logo}  style={{height: "20px", }}/>
                </a>
                <button
                className={`${Cookie.get('user') ? "d-sm-block  d-md-block" : "d-none "}  d-lg-none navbar-toggler`}
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <BiMenuAltRight style={{color: 'white', fontSize: '30px'}} />
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className={`${Cookie.get('user') ? "d-lg-block" : "d-lg-none"} nav-item active`}>
                            <Link style={{color: 'inherit', textDecoration: 'inherit'}} to="/dashboard">
                            Dashboard 
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li  className={`${Cookie.get('user') ? "d-lg-block" : "d-lg-none"} nav-item`}>
                            <a className="nav-link text-white" href="#">
                                <a onClick={() => logout()} className="nav-link text-white" href="#" >
                                    LogOut
                                </a>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            {/* ============ NAVBAR SECTION ENDS HERE==========  */}
        </div>
    );
}
//LOGOUT
const logout = () => {
    Cookie.remove('user');
    window.location.reload();
};