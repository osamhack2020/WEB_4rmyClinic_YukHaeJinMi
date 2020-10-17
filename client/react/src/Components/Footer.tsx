import React from 'react';
// import { Link } from "react-router-dom";
import '../scss/Footer.scss';
// import logo from '../assets/logo2_bgremoved.png';

export default function Footer(props: any) {
    return (
        <div className="footer">
            <div className="footer-row">
                <div className="col1">
                    <div className="copyright">COPYRIGHT ⓒ 2020 TEAM YukHaeJinMi ALL RIGHTS RESERVED</div>
                    {/* <div className="logo">
                        <Link to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div> */}
                    {/* <div className="blank"></div> */}
                </div>
                <hr />
                {/* <div className="col2">
                    <nav className="footer-container">
                        <ul className="footer-ul">
                            <Link to="/">Home</Link>
                            <Link to="/About">About</Link>
                            <Link to="/">Counseler</Link>
                            <Link to="/post/:id">Community</Link>
                            <Link to="/profile/:id">Profile</Link>
                        </ul>
                    </nav>
                </div> */}
            </div>
        </div>
    )
}