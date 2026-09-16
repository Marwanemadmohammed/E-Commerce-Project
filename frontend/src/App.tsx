import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./Containers/Home"
import Navbar from "./Components/Navbar"
import RegisterContainer from "./Containers/RegisterContainer"
import AuthProvider from "./Context/Auth/AuthProvider"
import LoginContainer from "./Containers/Login"
import CartContainer from "./Containers/CartContainer"
import ProtectedRoute from "./Components/ProtectedRoute"
import CartProvider from "./Context/Cart/CartProvider"
import CheckoutContainer from "./Containers/CheckoutContainer"
import OrderSuccessPage from "./Containers/OrderSuccess"


function App() {


  return (
    // Write in side it the routers of the page.
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Navbar />
              <Routes>
                <Route path="/" element = {<HomePage />}/>
                <Route path="/register" element = {<RegisterContainer />} />
                <Route path="/loginUser" element = {<LoginContainer />} />
                <Route element={<ProtectedRoute />}>
                <Route path="/cart" element = {<CartContainer />} />
                <Route path="/checkout" element = {<CheckoutContainer />} />
                <Route path="/Order-success" element = {<OrderSuccessPage />} />
              </Route>
            </Routes>
          </BrowserRouter> 
        </CartProvider> 
    </AuthProvider>
  )
}

export default App
