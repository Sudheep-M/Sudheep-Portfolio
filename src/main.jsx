import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Index from './Index.jsx'
import Navbar from './Index.jsx'
// import App from './app.jsx'
import Skills from './sample.jsx'
import DropInDivs from './EducationCard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <DropInDivs/> */}
    <Index/>
    {/* <Skills/> */}
    {/* <Apps/> */}
  </StrictMode>,
)
