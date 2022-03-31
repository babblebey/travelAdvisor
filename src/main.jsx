import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { MainContextProvider } from "./context/MainContext"

ReactDOM.render(
  <MainContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MainContextProvider>,
  document.getElementById('root')
)
