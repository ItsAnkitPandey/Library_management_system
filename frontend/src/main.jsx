import dotenv from 'dotenv';
import { SnackbarProvider } from 'notistack'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
dotenv.config();

ReactDOM.createRoot(document.getElementById('root')).render(
  <SnackbarProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </SnackbarProvider>
)
