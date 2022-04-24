import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from "react-router-dom"
import { MainContextProvider } from "./context/MainContext"

ReactDOM.render(
  <MainContextProvider>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </MainContextProvider>,
  document.getElementById('root')
)
