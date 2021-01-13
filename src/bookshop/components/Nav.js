import React from 'react';
import { NavLink } from "react-router-dom";
import UserModal from '../UserInfo';

const Nav = props => {

    const { firebase } = props;

    if (props.environment && props.environment === 'dev') {
        return (
            <div >
                <div>
                {/* so the whole structure of this sign in modal container works - the button with user name will stay but will open to user details and stuf */}
                    <UserModal firebase={firebase} />
                    {/* these two buttons below are just for dev testing */}
                    <button className="btn btn-sm btn-info" onClick={() => {firebase.auth().signOut(); console.log('signed out I think', firebase.auth().currentUser);}}>logout FB</button>
                    <button className="btn btn-sm btn-secondary" onClick={() => {console.log('currently, ', firebase.auth().currentUser);}}>current FB user</button>
                </div>
            </div>
        )
    }

    return (
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
                    {
                        props.firebase.auth().currentUser && <UserModal firebase={firebase} />
                    }
                </div>
            </div>
        </div>
    );
}

export default Nav;
