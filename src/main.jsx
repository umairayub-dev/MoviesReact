import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { FavoritesProvider } from './Context/Favorties/FavortiesContext.jsx'
import { ToastContextProvider } from './Context/Toast/ToastContext.jsx'
import { AuthContextProvider } from './Context/Auth/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <FavoritesProvider>
        <ToastContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ToastContextProvider>
      </FavoritesProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
