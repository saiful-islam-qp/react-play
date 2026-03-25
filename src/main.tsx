import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import AnimationContextProvider from './context/AnimationContextProvider.tsx'
import {BrowserRouter} from 'react-router'
import App from './App.tsx'
import '@npm-questionpro/wick-ui-icon/dist/wu-icon.css'
import '@npm-questionpro/wick-ui-lib/dist/style.css'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AnimationContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AnimationContextProvider>
  </StrictMode>,
)
