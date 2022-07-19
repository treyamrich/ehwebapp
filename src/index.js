import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Amplify from 'aws-amplify';
import awsconfig from "./aws-exports";
import { ContextProvider } from './contexts/ContextProvider';

Amplify.configure(awsconfig);
ReactDOM.render(
  <ContextProvider>
    <App/>
  </ContextProvider>,
  document.getElementById('root')
);