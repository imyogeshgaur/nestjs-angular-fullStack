import {Schema} from "mongoose"

export const userSchema = new Schema({
    firstName:String,
    lastName:String,
    emailOfUser:String,
    phoneNumber:Number,
    password:String
})
