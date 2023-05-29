import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { App } from './App'
import './styles/main.scss'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
  <StrictMode>
    <div className="app">
      <App />
    </div>
  </StrictMode>,
)
