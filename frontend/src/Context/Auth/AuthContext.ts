import { createContext , useContext} from "react";


interface AuthContextType {
    userName: string | null;  // (null) because the beginning state has no value.
    token: string | null;
    isAutheticated: boolean;
    login: (userName : string , token : string)=> void;
    logout: () => void;
};


export const AuthContext = createContext<AuthContextType>({userName: null , token: null , login: ()=>{} , isAutheticated: false , logout: ()=>{}});


export const useAuth = () => useContext(AuthContext); 