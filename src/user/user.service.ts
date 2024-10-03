import { Inject, Injectable } from '@nestjs/common';
import { sign } from "jsonwebtoken"
import { compare, hash } from "bcrypt"
import { Model, ObjectId } from 'mongoose';
import { resolve } from "path"
import { config } from "dotenv"
config({ path: resolve("./.env") })

@Injectable()
export class UserService {

    constructor(
        @Inject('USER_MODEL')
        private userModel: Model<User>
    ) { }

    async getAllUsers() {
        try {
            const users = await this.userModel.find();
            return users;
        } catch (error) {
            console.log("Error at user Service yogesh: ", error);
        }
    }
    async getSingleUser(id: ObjectId) {
        try {
            const user = await this.userModel.findById(id);
            return user;
        } catch (error) {
            console.log("Error at user Service: ", error);
        }
    }

    async registerUser(data: User) {
        try {
            const password = data.password as string;
            const newPassword = await hash(password, 12);
            const newUser = this.userModel.create({
                ...data,
                password: newPassword
            })
            return (await newUser).save();
        } catch (error) {
            console.log("Error at user Service: ", error);
        }
    }

    async loginUser(data: loginUser) {
        try {
            const { emailOfUser, password }: any = data;
            const isEmailExist: any = await this.userModel.findOne({ emailOfUser });
            if (isEmailExist) {
                if (await compare(password, isEmailExist.password)) {
                    const token = sign({ userId: isEmailExist._id }, process.env.JWT_SECRET as string)
                    return {
                        flag: 1, response: {
                            message: "User login Sucessfully !!!",
                            token
                        }
                    }
                } else {
                    return {
                        message:"Invalid Credentials !!!"
                }
            }
        }
        } catch (error) {
            console.log("Error at user Service: ", error);
        }
    }

    async resetPassword(id: ObjectId, data: any) {
        try {
            const newhasedPassword = await hash(data.password,12);
            const update: any = await this.userModel.updateOne({ _id:id},{password:newhasedPassword })
            return update.modifiedCount;
        } catch (error) {
            console.log("Error at user Service: ", error);
        }
    }

    async updateUser(id: ObjectId, data: any) {
        try {
            const { firstName, lastName, emailOfUser, phoneNumber } = data
            const update: any = await this.userModel.updateOne({_id:id},{
                emailOfUser,
                firstName,
                lastName,
                phoneNumber
            })
            return update.modifiedCount
        } catch (error) {
            console.log("Error at user Service: ", error);
        }
    }
}
