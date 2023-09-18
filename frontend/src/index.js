import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BoardsContextProvider } from './contexts/BoardsContext';
import { AuthContextProvider } from './contexts/AuthContext';
import { disableReactDevToosl } from '@fvilers/disable-react-devtools';

disableReactDevToosl();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BoardsContextProvider>
        <App />
      </BoardsContextProvider>    
    </AuthContextProvider>
    
  </React.StrictMode>
);
