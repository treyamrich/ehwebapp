import './styles/App.css';
import { Route, Switch } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import Login from './pages/auth/Login.js';
import PrivateRoute from './pages/PrivateRoute.js';
import SessionLogout from './pages/SessionLogout.js';

import Dashboard from './pages/user/Dashboard.js';
import ManageInventory from './pages/user/inventory/ManageInventory';

import Landing from './pages/Landing.js';


const initialFormState = {
  phoneNum:'',
  password:'',
  newPw:'',
  confNewPw:'',
  email: '', 
  name: '',
  authCode: '',
  formType:'signIn',
  idToken:'',
  //sesObj: {}
};

function App() {

  const [formState, setFormState] = useState(initialFormState);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isEmp, setIsEmp] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  async function signOut() {
    try {
        await Auth.signOut();
        window.location.reload();
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }
  async function onLoad() {
    //In the case of a page refresh/load, get the user again and set the state
    try {
      const user = await Auth.currentAuthenticatedUser();
      const groups = user.signInUserSession.accessToken.payload["cognito:groups"]; //Get user group to check if they're an organization
      setFormState({...formState, phoneNum: user.username, name: user.attributes.name, email: user.attributes.email, idToken: user.signInUserSession.idToken});
      userHasAuthenticated(true);
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
    }
    catch(e) {
      if (e !== 'The user is not authenticated') {
        alert(e);
      }
    }
    setIsAuthenticating(false);
  }
  //For sending emails
  /*
  useEffect(() => {
    //Upon sign in, the ses object is created for email capabilities
    if(isAuthenticated)
      setFormState({...formState, sesObj: createSESObj(idToken)});
  }, [isAuthenticated]);*/

  useEffect(() => {
    onLoad();
  }, []);
  //const {sesObj, idToken, name, email} = formState;
  const {name, email, phoneNum} = formState;

  return (
    !isAuthenticating && (
    <div>
      <Navbar className="navbar" fixed="top" expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/"> Engraving Hawaii </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>

            {isAuthenticated && (isEmp || isAdmin)  ?  
              <Nav.Item>
                <Nav.Link href="/dashboard">Dashboard </Nav.Link>
              </Nav.Item>
              : null
            }
            
            {isAuthenticated ? 
              <Nav.Item>
                <Nav.Link id="welcome-user"> Welcome {name}. </Nav.Link>
              </Nav.Item> 
              : null
            }

            <Nav.Item> {!isAuthenticated ? 
              <Nav.Link href="/login"> Login </Nav.Link> : 
              <Nav.Link onClick={()=>signOut()}> Sign out </Nav.Link>} 
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href="/manage-inventory">Manage Inventory</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {isAuthenticated ? <SessionLogout signOut={signOut}/> : null}

      <Switch>
        <Route exact path="/">
          <Landing/>
        </Route>
        <Route exact path="/login">
          <Login formState={formState} setFormState={setFormState} setAuth={userHasAuthenticated} setIsAdmin={setIsAdmin} setIsEmp={setIsEmp}/>
        </Route>

        <PrivateRoute exact path="/dashboard" auth={isAuthenticated}>
          <Dashboard email={email}/>
        </PrivateRoute>
        <PrivateRoute exact path="/manage-inventory" auth={isAuthenticated}>
          <ManageInventory isAdmin={isAdmin}/>
        </PrivateRoute>

        <Route>
          <h1 style={{marginTop: "100px"}}>This page is not available.</h1>
        </Route>
      </Switch>

    </div>
    )
  );
}

export default App;
