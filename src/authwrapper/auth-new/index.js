// import './styles.css';
// import React from 'react';

// const Auth = ({
//   email,
//   handleEmail,
//   handlePassword,
//   handlePasswordVerify,
//   handleSubmit,
//   handleUsername,
//   password,
//   passwordVerify,
//   username,
//   devCred
// }) => {

// // const signUpButton = document.getElementById('signUp');
// // const signInButton = document.getElementById('signIn');
// // const container = document.getElementById('container');

// // signUpButton.addEventListener('click', () => container.classList.add('right-panel-active'));
// // signInButton.addEventListener('click', () => container.classList.remove('right-panel-active'));

// const [ newUser, setNewUser ] = React.useState(true);

// const onClickSwitch = e => {
//   // e.target.classLisft
//   newUser ?
//   e.target.classList.add('auth-new-right-panel-active') :
//   e.target.classList.remove('auth-new-right-panel-active');

//   setNewUser(!newUser);
//   console.log('hmmm ok', e.target.classList);


  
//   // console.log(e.target.classList.addClass());
// }

// let header = newUser ? 'Create Account' : 'Welcome Back!';


//   return (
//     <div className="auth-new-container" id="auth-new-container">
//       <div className="auth-new-form-container sign-up-container">
//           <form onSubmit={e => handleSubmit(e, devCred[0], devCred[1], devCred[1], true)}>
//               <h1>{header}</h1>
//                 {/* <div className="social-container">
//                   <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
//                   <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
//                   <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
//                 </div> */}
//               {/* <span>Or use your email for registration</span> */}
//               <input type="text" placeholder="Name" onChange={handleUsername} value={username} />
//               <input type="email" placeholder="Email" onChange={handleEmail} value={email} />
//               <input type="password" placeholder="Password" onChange={handlePassword} value={password} />
//               <input type="password" placeholder="Password" onChange={handlePasswordVerify} value={passwordVerify} />

//               <button>Sign Up</button>
//           </form>
//       </div>

//       <div className="auth-new-form-container sign-in-container">
//           <form onSubmit={e => handleSubmit(e, email, password)}>
//               <h1>Sign In</h1>
//               {/* <div className="social-container">
//                   <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
//                   <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
//                   <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
//               </div>
//               <span>Or use your account</span> */}
//               <input type="email" placeholder="Email" onChange={handleEmail} value={email} />
//               <input type="password" placeholder="Password" onChange={handlePassword} value={password} />
//               <a href="#top">Forgot your password?</a>
//               <input type='submit' text='SignIn' />
//           </form>
//       </div>
//       <div className="auth-new-overlay-container">
//           <div className="auth-new-overlay">
//               <div className="auth-new-overlay-panel auth-new-overlay-left">
//                   <h1>Welcome Back!</h1>
//                   <p>To stay connected with us please login with your info</p>
//                   <button className="ghost" id="auth-new-signIn">Sign In</button>
//               </div>
//               <div className="auth-new-overlay-panel auth-new-overlay-right">
//                   <h1>Hello There!</h1>
//                   <p>Enter your details and start your journey with us</p>
//                   <button 
//                     className="ghost"
//                     id="auth-new-signUp"
//                     onClick={onClickSwitch}
//                   >
//                     Sign Up
//                   </button>
//               </div>
//           </div>
//       </div>
//     </div>
//   );

// }

// export default Auth;