import { useState, type FC, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";

// FC ==> Means function component.

const AuthProvider : FC<PropsWithChildren> = ({ children }) => {

    const [userName , setuserName] = useState<string | null>(localStorage.getItem("userName"));
    const [token , settoken] = useState<string | null>(localStorage.getItem("token"));


    const login = (userName : string , token : string)=>{
        setuserName(userName);
        settoken(token);
        localStorage.setItem('userName', userName);
        localStorage.setItem('token', token);
    }
    
    return(
            <AuthContext.Provider value={{userName , token , login}}>
                {children}
            </AuthContext.Provider>
    )
};


export default AuthProvider;