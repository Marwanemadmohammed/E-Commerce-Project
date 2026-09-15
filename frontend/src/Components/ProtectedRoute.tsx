import { Navigate ,Outlet } from "react-router-dom"
import { useAuth } from "../Context/Auth/AuthContext";


const ProtectedRoute = () => {
    const {isAutheticated} = useAuth();
    if(isAutheticated){
        return <Outlet />  // to rednder the children (if user loged in)
    }
    else{
        return <Navigate to="/loginUser" replace={true} /> // if user not loged in ==> return is to the login page.
    }
};


export default ProtectedRoute;