import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Index from './Index.jsx'
import Skills from './Index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Index/> */}
    <Skills/>
  </StrictMode>,
)
