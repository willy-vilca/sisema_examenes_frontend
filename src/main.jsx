import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MathJaxProvider from "./providers/MathJaxProvider";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MathJaxProvider>
      <App />
    </MathJaxProvider>
  </StrictMode>,
)
