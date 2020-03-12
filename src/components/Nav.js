import React from 'react';
import { NavLink } from "react-router-dom";
import SignInModalContainer from '../containers/sign-in/modal';

const Nav = ({ firebase }) => (
    <div id="nav mt-1">
        <div className="mt-1">
            <NavLink className="navLink m-2" to="/">
                Home
            </NavLink>
            <NavLink className="navLink m-2" to="/cart">
                Cart
            </NavLink>
            <NavLink className="navLink m-2" to="/featured">
                Featured
            </NavLink>
            <div className="float-right">
                <SignInModalContainer firebase={firebase} />
            </div>
        </div>
    </div>
);

export default Nav;
