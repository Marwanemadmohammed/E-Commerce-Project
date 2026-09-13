import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



interface RegisterParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const register = async ({firstName,lastName,email,password} : RegisterParams) => 
    {
        // If User entered an email already exist ==> Return a message.
    const findUser = await UserModel.findOne({ email: email });

    if (findUser) 
    {
    return { data: "User Already exists!" , statusCode : 400  };
    }

    const hashedPassword = await bcrypt.hash(password , 10); // 10 ==> means the number if the encryption on the data 

    const newUser = new UserModel({ lastName, firstName, email, password:hashedPassword });

    await newUser.save();

    return { data: generateJWT({firstName , lastName , email}) , statusCode : 200 };
};


interface LoginParams {
    email: string,
    password: string
}

export const loginUser = async ({email , password} : LoginParams)=>{
    const findUser = await UserModel.findOne({ email: email });

    if(!findUser){
        return {data : "Incorrect Email or password" , statusCode : 400};
    }

    // here to compare between the encrypt data and the data in the mongodb
    const checkPass = await bcrypt.compare(password , findUser.password);

    if(checkPass){
        return {data : generateJWT({
            email , 
            firstName: findUser.firstName 
            ,lastName: findUser.lastName}) 
            ,statusCode : 200};
    }

    return {data : "Incorrect Email or password" , statusCode : 400};
}



const generateJWT = (data : any) =>{
    return jwt.sign(data , process.env.JWT_SECRET || ""); // || " " If the JWT_SECRET is undefined.
};