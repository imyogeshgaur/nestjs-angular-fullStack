import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { ObjectId } from 'mongoose';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get("allUsers")
    async getAllUsers(@Res() res: Response) {
        try {
            const users = await this.userService.getAllUsers();
            return res.status(200).send({users});
        } catch (error) {
            console.log("Error in user controller: ", error);
            return res.status(500).send({ message: "Internal Server Error !!!" })
        }
    }

    @Get(":id")
    async getASingleUser(@Param() params: any,@Res() res: Response) {
        try {
            const id = params.id;
            const user = await this.userService.getSingleUser(id);
            return res.status(200).send(user);
        } catch (error) {
            console.log("Error in user controller: ", error);
            return res.status(500).send({ message: "Internal Server Error !!!" })
        }
    }

    @Post("register")
    async registerUser(@Body() body: User, @Res() res: Response) {
        try {
            const user = await this.userService.registerUser(body);
            return res.status(200).send({ message: "User Registered !!", user })
        } catch (error) {
            console.log("Error in user controller: ", error);
            return res.status(500).send({ message: "Internal Server Error !!!" })
        }
    }

    @Post("login")
    async loginUser(@Body() body: loginUser, @Res() res: Response): Promise<Response> {
        try {
            const { flag, response } = await this.userService.loginUser(body);
            if (flag === 1) return res.status(200).send(response)
            else return res.status(401).send(response.message);
        } catch (error) {
            console.log("Error in user controller: ", error);
            return res.status(500).send({ message: "Internal Server Error !!!" })
        }
    }

    @Put("resetPassword/:id")
    async resetPassword(@Param() param: any, @Body() body: any, @Res() res: Response): Promise<Response> {
        try {
            const idToChange = param.id
            const update = await this.userService.resetPassword(idToChange, body);
            if(update) res.status(200).send({message:"Password Reset Sucessfully !!!"})
            return res.status(200).send({message:"Passwore Reset Failed !!!"})
        } catch (error) {
            console.log("Error in user controller: ", error);
            return res.status(500).send({ message: "Internal Server Error !!!" })
        }
    }

    @Put("update/:id")
    async updateUserDetails(@Param() param: any, @Body() body: any, @Res() res: Response): Promise<Response> {
        try {
            const idToChange = param.id
            const update = await this.userService.updateUser(idToChange, body);
            if(update) res.status(200).send({message:"Details Updated Sucessfully !!!"})
            return res.status(200).send({message:"Details Update Failed !!!"})
        } catch (error) {
            console.log("Error in user controller: ", error);
            return res.status(500).send({ message: "Internal Server Error !!!" })
        }

    }
}
