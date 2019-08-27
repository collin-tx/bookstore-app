import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

export class Nav extends Component {
    render() {
        return (
            <div id="nav">
                <NavLink className="navLink" to="/">Home</NavLink>
                <NavLink className="navLink" to="/cart">Cart</NavLink> 
            </div>
        )
    }
}

export default Nav