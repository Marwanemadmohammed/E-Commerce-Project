import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./Containers/Home"
import Navbar from "./Components/Navbar"
import RegisterContainer from "./Containers/RegisterContainer"
import AuthProvider from "./Context/Auth/AuthProvider"


function App() {


  return (
    // Write in side it the routers of the page.
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element = {<HomePage />}/>
            <Route path="/register" element = {<RegisterContainer />} />
          </Routes>
      </BrowserRouter>  
    </AuthProvider>
  )
}

export default App
