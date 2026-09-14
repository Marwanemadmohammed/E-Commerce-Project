import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./Containers/Home"
import Navbar from "./Components/Navbar"


function App() {


  return (
    // Write in side it the routers of the page.
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element = {<HomePage />}/>
        </Routes>
    </BrowserRouter>  
  )
}

export default App
