import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Auth0Provider} from "@auth0/auth0-react";
import { UserProvider } from './UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider 
    domain ="dev-nvwewl5ia1yhcfl2.us.auth0.com" 
    clientId='y4OkMidmOZt4pDrsNSAZXlKv9PUq8a5e' 
    redirectUri={window.location.origin}>
      <UserProvider>
      <App />
      </UserProvider>
    </Auth0Provider>

);
