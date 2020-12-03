// import React, { Component } from 'react';
// import { connect } from 'react-redux';

// // import SignIn from './SignIn'
// // import SignUp from './SignUp';

// import AuthNew from './index';

// import { signOut } from '../../actions';
// import { signIn, unwrap, createUser} from '../sign-in/actions';
// import { removeError, renderError } from '../../actions';
// import { validateEmail, validatePassword } from '../../utils/helper';

// class SignInContainer extends Component {

//   state = {
//     email: '',
//     password: '',
//     passwordVerify: '',
//     username: ''
//   }

//   componentDidMount() {
//     const user = this.props.firebase.auth().currentUser;
//     if (!!user){
//       if (!this.state.isSignedIn) {
//         // this.props.unwrap(this.props.firebase);
//       }
      
//     } else {
//       // this.props.signOut(this.props.firebase);
//     }
//   }

//   handleEmail = e => {
//     this.setState({ email: e.target.value });
//   }

//   handlePassword = e => {
//     this.setState({ password: e.target.value });
//   }

//   handlePasswordVerify = e => {
//     this.setState({ passwordVerify: e.target.value });
//   }

//   handleUsername = e => {
//     this.setState({ username: e.target.value })
//   }

//   handleSubmit = (e, email, password, passwordVerify = null, newUser = false) => {
//     e.preventDefault();

//     console.log('this', email, password);

//     if (validateEmail(email)) {
//       if (this.props.isNewUser) {
//         if (validatePassword(password, passwordVerify)) {
//           this.props.createUser(this.props.firebase, this.state.email, this.state.password, this.state.username);
//           // this.props.unwrap(this.props.firebase);
//         } else {
//           this.props.renderError({ error: { message: newUser ? 'Passwords must match and be at least 6 characters' : 'Incorrect Password' } });
//         }
//       }

//       if (!this.props.isNewUser) {
//         this.loginUser(this.state.email, this.state.password);
//         const user = this.props.firebase.auth().currentUser
//         if (!!user) {
//           // this.props.unwrap(this.props.firebase);
//         } 
//       }
    
//     } else if (!validateEmail(email)) {
//       this.props.renderError({ error: { message: 'Please use a proper email address' } });
//     } else if (!this.state.username.length && newUser){
//       this.props.renderError({ error: { message: 'Please enter a username' } });
//     }

//   }

//   loginUser = (email, password) => {
//     const { firebase } = this.props;
//     this.props.signIn(firebase, email, password);
//   }

  
//   render() {
    
//           const { email, password, passwordVerify, username } = this.state;
//           const devCred = ['app@app.com', 'app123987'];
//           const { error } = this.props;

//           // console.log(signOut, signIn, unwrap, createUser,removeError, renderError,validateEmail, validatePassword );

//     return (
//       <div className="authwrapper">
//         <AuthNew
//           email={email}
//           error={error}
//           handleEmail={this.handleEmail}
//           handlePassword={this.handlePassword}
//           handlePasswordVerify={this.handlePasswordVerify}
//           handleSubmit={this.handleSubmit}
//           handleUsername={this.handleUsername}
//           password={password}
//           passwordVerify={passwordVerify}
//           username={username}
//           devCred={devCred}
//         /> 
//       </div>
//     );
//   }
// }

// const mapState = state => ({
//     user: state.user,
//     isSignedIn: state.isSignedIn,
//     error: state.error,
// });

// const mapDispatch = dispatch => ({
//     signIn: (firebase, email, password) => dispatch(signIn(firebase, email, password)),
//     // signOut: firebase => dispatch(signOut(firebase)),
//     // unwrap: firebase => dispatch(unwrap(firebase)),
//     createUser: (firebase, email, password, username) => dispatch(createUser(firebase, email, password, username)),
//     removeError: () => dispatch(removeError()),
//     renderError: error => dispatch(renderError(error)),
// });

// export default connect(mapState, mapDispatch)(SignInContainer);
