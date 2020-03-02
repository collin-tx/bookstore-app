import React from 'react';
import { NavLink } from "react-router-dom";

const Nav = () => (
    <div id="nav" className="float-right mt-3">
        <NavLink className="navLink m-2" to="/">Home</NavLink>
        <NavLink className="navLink m-2 mr-3" to="/cart">Cart</NavLink>
        <NavLink className="navLink m-2 mr-3" to="/featured">Featured</NavLink>
    </div>
);

export default Nav;