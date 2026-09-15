import { createContext , useContext} from "react";


interface AuthContextType {
    userName: string | null;  // (null) because the beginning state has no value.
    token: string | null;
    login: (userName : string , token : string)=> void;
    isAutheticated: boolean;
};


export const AuthContext = createContext<AuthContextType>({userName: null , token: null , login: ()=>{} , isAutheticated: false});


export const useAuth = () => useContext(AuthContext); 