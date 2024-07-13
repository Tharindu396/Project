import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from './context/AuthContext.jsx';
import { ChakraProvider } from '@chakra-ui/react'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
  <AuthProvider>
    <ChakraProvider>
    <App />
    </ChakraProvider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
