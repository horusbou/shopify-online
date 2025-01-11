import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppProvider } from "./context/context"
import { ErrorProvider } from './context/ErrorContext.tsx'
import {BrowserRouter as Router} from "react-router-dom"


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
    <ErrorProvider>
    <Router>
      <App />
      </Router>
    </ErrorProvider>
    </AppProvider>
  </StrictMode>,
)
