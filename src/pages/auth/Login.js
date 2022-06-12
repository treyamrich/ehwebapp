import React, {useState} from 'react';
import { Auth } from 'aws-amplify';
import {Redirect} from 'react-router-dom';
import { Alert, Form, Button, Container} from 'react-bootstrap';
import "../../styles/login.css";

function Login({formState, setFormState, setAuth, setIsAdmin, setIsOrg}) {
	
	const {username, password, newPw, confNewPw, email, name, authCode, formType} = formState;
	const [redirect, setRedirect] = useState(false);
	const [error, setError] = useState("none");

	async function signUp(e) {
		e.preventDefault();

		if(password !== confNewPw) { //Check if passwords match. *Note confNewPw is just confirm password*
			setError("Passwords do not match!");
			return;
		}
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
  	async function changePassword(e) {
  		e.preventDefault();

		if(newPw !== confNewPw) { //Check if passwords match
			setError("Passwords do not match!");
			return;
		}
		try {
			await Auth.forgotPasswordSubmit(username, authCode, newPw);
			setError("none");
			setFormState({...formState, newPw:'', confNewPw:'', authCode:'', formType:'pwChangeSuccess'});
		} catch(e){
			setError(e.message);
		}
  	}
  	async function sendCode(e) {
  		e.preventDefault();

  		// Send confirmation code to user's email
  		try {
  			await Auth.forgotPassword(username);
			setFormState({...formState, formType:'changePassword'});
			setError("none");
  		} catch(e) {
  			if(e.message === "Username/client id combination not found.") {
  				setError("Account with corresponding email does not exist.");
  			} else {
  				setError(e.message);
  			}
  		}
  	}
  	async function signIn(e) {
  		e.preventDefault();
	    try {
	        const user = await Auth.signIn(username, password);
	        const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
	        setFormState({...formState, formType: 'signnedIn', email: username, name: user.attributes.name, idToken: user.signInUserSession.idToken}); //Parent component doesn't rerender, so pass info
	        setAuth(true);
	        //Check for authorization
			if(groups) {
				for(var i = 0; i < groups.length; i++) {
				  switch(groups[i]) {
				    case "organization":
				      setIsOrg(true);
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
  		return <Redirect to="/"/>;
  	}
	return(
		<div className="main-wrapper">
			<div className="sub-wrapper d-flex justify-content-center align-items-center">
			{formType === 'signIn' && (
			<Form className="text-center p-4 p-sm-5" onSubmit={signIn}>
				<h1 className="mb-3">Sign In</h1>
					<Form.Group className="mb-3">
						<Form.Label> Phone Number </Form.Label>
						<Form.Control onChange={(e)=>setFormState({...formState, username: e.target.value.toLowerCase()})}
							type="tel" 
							placeholder="xxx-xxxx"
							value={username}
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
					<a className="link-button" onClick={()=>{setFormState({...formState, username: '', password: '', confNewPw:'', formType: 'signUp'}); setError("none");}}>
						Sign Up
					</a>
					<a className="link-button" onClick={()=>setFormState({...formState, formType:'forgotPassword'})}> 
						Forgot Password 
					</a>
				</p>
			</Form>
			)}
			{formType === 'signUp' && (
			<Form className="text-center p-4 p-sm-5" onSubmit={signUp}>
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
						<Form.Control onChange={(e)=>setFormState({...formState, username: e.target.value.toLowerCase()})}
							placeholder="xxx-xxxx"
							value={username}
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
					<a onClick={()=>{setFormState({...formState, password: '', confNewPw:'', username:'', name:'', formType: 'signIn'}); setError("none");}}
						className="link-button"> Login 
					</a>
				</p>
			</Form>
			)}
			{formType === 'confirmSignUp' && (
				<Container>
					<Alert variant="success">Please check your email for a confirmation link.</Alert>
					<Button variant="dark" className="mb-3" className="login" type="button" onClick={()=>setFormState({...formState, confNewPw:'', username:'', name:'', password:'', authCode:'', formType: 'signIn'})}> 
						Back To Login </Button>
				</Container>
			)}
			{formType === 'forgotPassword' && (
					<Form className="text-center p-4 p-sm-5" onSubmit={sendCode}>
						<h2 className="mb-3">Forgot Password</h2>
						<Form.Group className="mb-3">
							<Form.Label>Email</Form.Label>
							<Form.Control onChange={(e)=>setFormState({...formState, username: e.target.value})}
								placeholder="Email"
								value={username}
								type="email"
								required
								name="forgot_password_email" 
								/>
						</Form.Group>
						<Button variant="dark" className="mb-3" type="submit">Send Code</Button>
						<p>
							<a className="link-button" onClick={()=>{setFormState({...formState, username:'', name:'', password:'', authCode:'', formType: 'signIn'});setError("none")}}> 
								Back to login </a>
						</p>
					</Form>
			)}
			{formType === 'changePassword' && (
					<Form className="text-center p-4 p-sm-5" onSubmit={changePassword}>
						<h3>Please check your email <br/>for a code.</h3>
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
							<a className="link-button" onClick={()=>{setFormState({...formState, username:'', name:'', newPw:'', confNewPw:'', authCode:'', formType: 'signIn'});setError("none")}}>
								Cancel
							</a>
						</p>
					</Form>
			)}
			{formType === 'pwChangeSuccess' && (
				<Container>
					<Alert variant="success">Password Successfully Changed.</Alert>
						<Button variant="dark" className="mb-3" type="button" onClick={()=>setFormState({...formState, username:'', name:'', password:'', authCode:'', formType: 'signIn'})}> 
									Back To Login </Button>
				</Container>
			)}
			</div>
			{error !== "none" ? <Alert className="error" variant="danger" onClose={() => setError("none")} dismissible> {error} </Alert> : null}
		</div>
	);
}

export default Login;