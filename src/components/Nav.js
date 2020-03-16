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
                <button className="btn btn-sm btn-info" onClick={() => {firebase.auth().signOut(); console.log('signed out I think', firebase.auth().currentUser);}}>logout FB</button>
                <button className="btn btn-sm btn-secondary" onClick={() => {console.log('currently, ', firebase.auth().currentUser);}}>current FB user</button>
            </div>
        </div>
    </div>
);

export default Nav;
