import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import React, { useState, useEffect } from 'react';

import { SessionLogout, PrivateRoutes } from './util-components/index';
import Login from './pages/auth/Login.js';
import { Dashboard, Home, Order } from './pages/index';
import { createDynamoDBObj } from './libs/aws-dynamodb';

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
  dynamodbObj: {}
};

const App = () => {

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
  
  useEffect(() => {
    //Upon sign in, the ses object is created for email capabilities
    if(isAuthenticated)
      setFormState({...formState, dynamodbObj: createDynamoDBObj(idToken)});
  }, [isAuthenticated]);

  useEffect(() => {
    onLoad();
  }, []);
  const {dynamodbObj, idToken, name} = formState;

  return (
    !isAuthenticating && (
    <div>
      
      {isAuthenticated ? <SessionLogout signOut={signOut}/> : null}

      <Router>
        <Routes>

          {/*Unprotected Routes*/}
          <Route element={<Home signOut={signOut} name={name} isAuthenticated={isAuthenticated}/>} path="/*"/>
          <Route path="/login" element={
            <Login formState={formState} setFormState={setFormState} setAuth={userHasAuthenticated} setIsAdmin={setIsAdmin} setIsEmp={setIsEmp}/>
          }/>
          <Route element={<Order/>} path="/order/*"/>
          
          {/*Protected Routes*/}
          <Route element={<PrivateRoutes auth={isAuthenticated}/>}>
            <Route element={
              <Dashboard isAdmin={isAdmin} isEmp={isEmp}/>
            } path="/management/*"/>
          </Route>
        </Routes>
      </Router>
    </div>
    )
  );
}

export default App;
