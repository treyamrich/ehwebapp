import React, {useState} from 'react';
import { Auth } from 'aws-amplify';
import {Navigate} from 'react-router-dom';
import {formatPhoneNum} from '../../utility/PhoneFormat.js';
import { Alert, Form, Button, Container} from 'react-bootstrap';
import "../../styles/login.css";

function Login({formState, setFormState, setAuth, setIsAdmin, setIsEmp}) {
	
	const {phoneNum, password, newPw, confNewPw, email, name, authCode, formType} = formState;
	const [redirect, setRedirect] = useState(false);
	const [error, setError] = useState("none");

	async function signUp(e) {
		e.preventDefault();

		if(password !== confNewPw) { //Check if passwords match.
			setError("Passwords do not match!");
			return;
		}
		console.log(phoneNum);
		let username = formatPhoneNum(phoneNum);
		console.log(username);

    	//If all checks pass try signing up
	    try {
	        await Auth.signUp({
	            username,
	            password,
	            attributes: {
	            	name,
	            	email
	            }
	        });
	       	setFormState({...formState, formType: 'confirmSignUp'});
	       	setError("none");
	    } catch (e) {
	        setError(e.message);
	    }
  	}
  	async function confirmSignUp(e) {
  		//Sends sign up auth code to user's phone

  		e.preventDefault();
  		let username = formatPhoneNum(phoneNum);

  		try {
  			await Auth.confirmSignUp(
  				username,
			    authCode
  			);
			setFormState({...formState, formType:'signUpSuccess'});
			setError("none");
  		} catch(e) {
  			setError(e.message);
  		}
  	}
  	async function changePassword(e) {
  		e.preventDefault();

		if(newPw !== confNewPw) { //Check if passwords match
			setError("Passwords do not match!");
			return;
		}

		let username = formatPhoneNum(phoneNum);

		try {
			await Auth.forgotPasswordSubmit(username, authCode, newPw);
			setError("none");
			setFormState({...formState, newPw:'', confNewPw:'', authCode:'', formType:'pwChangeSuccess'});
		} catch(e){
			setError(e.message);
		}
  	}
  	async function sendCode(e) {
  		//Sends password reset code to user's phone

  		e.preventDefault();
  		let username = formatPhoneNum(phoneNum);

  		// Send confirmation code to user's phone number
  		try {
  			await Auth.forgotPassword(username);
			setFormState({...formState, formType:'changePassword'});
			setError("none");
  		} catch(e) {
  			if(e.message === "Username/client id combination not found.") {
  				setError("Account with the entered information does not exist.");
  			} else {
  				setError(e.message);
  			}
  		}
  	}
  	async function signIn(e) {
  		e.preventDefault();
  		let username = formatPhoneNum(phoneNum);

	    try {
	        const user = await Auth.signIn(username, password);
	        const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
	        setFormState({...formState, formType: 'signnedIn', phoneNum: username, email: email, name: user.attributes.name, idToken: user.signInUserSession.idToken}); //Parent component doesn't rerender, so pass info
	        setAuth(true);
	        //Check for authorization
			if(groups) {
				for(var i = 0; i < groups.length; i++) {
				  switch(groups[i]) {
				    case "employee":
				      setIsEmp(true);
				      break;
				    case "admin":
				      setIsAdmin(true);
				      break;
				  }
				}
			}
	        setRedirect(true); //rerender this component to redirect
	    } catch (e) {
	        setError("Invalid Credentials!");
	    }
  	}
  	if(redirect) {
  		return <Navigate to="/"/>;
  	}
	return(
		<div className="main-wrapper">
			<div className="sub-wrapper d-flex justify-content-center align-items-center">
			{formType === 'signIn' && (
			<Form className="text-center p-4 p-sm-5" onSubmit={signIn}>
				<h1 className="mb-3">Sign In</h1>
					<Form.Group className="mb-3">
						<Form.Label> Phone Number </Form.Label>
						<Form.Control onChange={(e)=>setFormState({...formState, phoneNum: e.target.value.toLowerCase()})}
							type="tel" 
							pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
							placeholder="xxx-xxx-xxxx"
							value={phoneNum}
							required
							name="phone"
						/>
						<Form.Text className="text-muted">
					      <span id="disclaim"> We'll never share your information with anyone. </span>
					    </Form.Text>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label> Password </Form.Label>
						<Form.Control onChange={(e)=>setFormState({...formState, password: e.target.value})}
							type="password"
							value={password}
							placeholder="Password"
							required
						/>
					</Form.Group>
				<Button variant="dark" className="mb-3" type="submit">Login</Button>
				<p>
					<a className="link-button" onClick={()=>{setFormState({...formState, phoneNum: '', password: '', confNewPw:'', formType: 'signUp'}); setError("none");}}>
						Sign Up
					</a>
					<a className="link-button" onClick={()=>setFormState({...formState, formType:'forgotPassword'})}> 
						Forgot Password 
					</a>
				</p>
			</Form>
			)}
			{formType === 'signUp' && (
			<Form className="text-center p-4 p-sm-5" id="signup" onSubmit={signUp}>
				<h1 className="mb-3">Sign Up</h1>
					<Form.Group className="mb-3">
						<Form.Label>Name</Form.Label>
						<Form.Control onChange={(e)=>setFormState({...formState, name: e.target.value})}
							placeholder="Name"
							value={name}
							type="text" 
							required
							name="signup_name"
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Phone Number</Form.Label> 
						<Form.Control onChange={(e)=>setFormState({...formState, phoneNum: e.target.value.toLowerCase()})}
							placeholder="xxx-xxx-xxxx"
							pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
							value={phoneNum}
							type="tel"
							required
							name="signup_phone" 
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Email</Form.Label>
						<Form.Control onChange={(e)=>setFormState({...formState, email: e.target.value.toLowerCase()})}
							placeholder="johnnyappleseed@gmail.com"
							value={email}
							type="email"
							required
							name="signup_email" 
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Password</Form.Label>
						<Form.Control onChange={(e)=>setFormState({...formState, password: e.target.value})}
							placeholder="Password"
							value={password}
							type="password"
							required
							name="signup_pw"
						/>
					</Form.Group> 
					<Form.Group className="mb-3">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control onChange={(e)=>setFormState({...formState, confNewPw: e.target.value})}
							placeholder="Confirm Password"
							value={confNewPw}
							type="password"
							required
							name="signup_confpw" 
						/>
					</Form.Group>
				<Button variant="dark" className="mb-3" type="submit"> Confirm </Button>
				<p> Already have an account? 
					<a onClick={()=>{setFormState({...formState, password: '', confNewPw:'', phoneNum:'', name:'', formType: 'signIn'}); setError("none");}}
						className="link-button"> Login 
					</a>
				</p>
			</Form>
			)}
			{formType === 'confirmSignUp' && (
				<Form className="text-center p-4 p-sm-5" onSubmit={confirmSignUp}>
					<h2 className="mb-3">Confirm Sign Up</h2>
					<Form.Group className="mb-3">
						<Form.Label>Sign up code</Form.Label>
						<Form.Control onChange={(e)=>setFormState({...formState, authCode: e.target.value})}
							placeholder="xxxxxx"
							value={authCode}
							type="text"
							required
							name="signup_code" 
							/>
					</Form.Group>
					<Button variant="dark" className="mb-3" type="submit">Submit</Button>
					<p>
						<a className="link-button" onClick={()=>{setFormState({...formState, phoneNum:'', name:'', email: '', password:'', authCode:'', formType: 'signIn'});setError("none")}}> 
							Back to login </a>
					</p>
				</Form>
			)}
			{formType === 'signUpSuccess' && (
				<Container>
					<Alert variant="success">You've successfully signed up!</Alert>
					<Button variant="dark" className="mb-3 login" type="button" onClick={()=>setFormState({...formState, confNewPw:'', phoneNum:'', email, name:'', password:'', authCode:'', formType: 'signIn'})}> 
						Back To Login </Button>
				</Container>
			)}
			{formType === 'forgotPassword' && (
					<Form className="text-center p-4 p-sm-5" onSubmit={sendCode}>
						<h2 className="mb-3">Forgot Password</h2>
						<Form.Group className="mb-3">
							<Form.Label>Phone Number</Form.Label>
							<Form.Control onChange={(e)=>setFormState({...formState, phoneNum: e.target.value})}
								placeholder="xxx-xxx-xxxx"
								value={phoneNum}
								type="tel"
								pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
								required
								name="forgot_password_email" 
								/>
						</Form.Group>
						<Button variant="dark" className="mb-3" type="submit">Send Code</Button>
						<p>
							<a className="link-button" onClick={()=>{setFormState({...formState, phoneNum:'', name:'', email: '', password:'', authCode:'', formType: 'signIn'});setError("none")}}> 
								Back to login </a>
						</p>
					</Form>
			)}
			{formType === 'changePassword' && (
					<Form className="text-center p-4 p-sm-5" onSubmit={changePassword}>
						<h3>Please check your phone <br/>for the authentication code.</h3>
							<Form.Group className="mb-3">
								<Form.Label>Enter Code</Form.Label>
								<Form.Control onChange={(e)=>setFormState({...formState, authCode: e.target.value})}
									placeholder="Code"
									value={authCode}
									type="text"
									required
									name="forgot_authcode" 
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>New Password</Form.Label>
								<Form.Control onChange={(e)=>setFormState({...formState, newPw: e.target.value})}
									placeholder="New Password"
									value={newPw}
									type="password"
									required
									name="forgot_newpw" 
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Confirm New Password</Form.Label>
								<Form.Control onChange={(e)=>setFormState({...formState, confNewPw: e.target.value})}
									placeholder="Confirm New Password"
									value={confNewPw}
									type="password"
									required
									name="forgot_confnewpw" 
								/>
							</Form.Group>
						<Button variant="dark" className="mb-3" type="submit">Change Password</Button>
						<p>
							<a className="link-button" onClick={()=>{setFormState({...formState, phoneNum:'', email:'', name:'', newPw:'', confNewPw:'', authCode:'', formType: 'signIn'});setError("none")}}>
								Cancel
							</a>
						</p>
					</Form>
			)}
			{formType === 'pwChangeSuccess' && (
				<Container>
					<Alert variant="success">Password Successfully Changed.</Alert>
						<Button variant="dark" className="mb-3" type="button" onClick={()=>setFormState({...formState, phoneNum:'', email: '', name:'', password:'', authCode:'', formType: 'signIn'})}> 
									Back To Login </Button>
				</Container>
			)}
			</div>
			{error !== "none" ? <Alert className="error" variant="danger" onClose={() => setError("none")} dismissible> {error} </Alert> : null}
		</div>
	);
}

export default Login;