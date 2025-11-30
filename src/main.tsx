import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AnimationContextProvider from './context/AnimationContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AnimationContextProvider>
      <App />
    </AnimationContextProvider>
  </StrictMode>,
)
