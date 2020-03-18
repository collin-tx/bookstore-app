import React from 'react';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import SignInModalContainer from '../containers/sign-in/modal';
import { signInUI, signOutUI } from '../actions';

const Nav = props => {

    const { firebase } = props;
    
    // this tracks whether a user is already logged in with FB -- if so, it updates the UI accordingly. 
    if (!firebase.auth().currentUser) {
        setTimeout(() => {
            const userFB = firebase.auth().currentUser;
            if (!!userFB) {
                props.signInUI(userFB.email, userFB.displayName);
            } else {
                props.signOutUI(firebase);
            }
        }, 200);
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
                    <SignInModalContainer firebase={firebase} />
                    {/* these two buttons below are just for dev testing stuff */}
                    {/* <button className="btn btn-sm btn-info" onClick={() => {firebase.auth().signOut(); console.log('signed out I think', firebase.auth().currentUser);}}>logout FB</button>
                    <button className="btn btn-sm btn-secondary" onClick={() => {console.log('currently, ', firebase.auth().currentUser);}}>current FB user</button> */}
                </div>
            </div>
        </div>
    );
}

const mapState = state => ({
    ...state,
    signedIn: state.signedIn,
    user: state.user
});

const mapDispatch = dispatch => ({
    signInUI: (email, username) => dispatch(signInUI(email, username)),
    signOutUI: () => dispatch(signOutUI())
});

export default connect(mapState, mapDispatch)(Nav);
