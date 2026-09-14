import mongoose , {Schema , Document} from "mongoose";

export interface User extends Document{
    firstName: string,
    lastName: string,
    email: string,
    password: string
};

const UserSchema : Schema = new Schema<User>({
    firstName: {type: String , required: true},
    lastName: {type: String , required: true},
    email: {type: String , required: true},
    password: {type: String , required: true}
});


const UserModel = mongoose.model<User>("User" , UserSchema);



export default UserModel;