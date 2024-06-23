// frontend/src/index.js

import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import 'bulma/css/bulma.min.css';
import { AuthProvider } from './auth/AuthProvider';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>,
    </Router>,
  </React.StrictMode>,
 
);
