import { Body, Controller, Get, Param, Post, Put, Res, UploadedFile, UseInterceptors,} from '@nestjs/common';
import { Response } from 'express';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService) { }
    @Get("getAllProducts")
    async getAllUsers(@Res() res:Response) {
        try {
            const products = await this.productService.getAllProducts();
            return res.status(200).send({products});
        } catch (error) {
            console.log("Error at product controller : ",error);
            return res.status(500).send({message:"Internal Server Error !!!"})
        }
    }

    @Get(":id")
    async getSingleProduct(@Param() params:any,@Res() res:Response){
        try {
            const productId = params.id
            const product = await this.productService.getSingleProduct(productId)
            return res.status(200).send({product})
        } catch (error) {
            console.log("Error at product controller : ",error);
            return res.status(500).send({message:"Internal Server Error !!!"})
        }
    }

    @Post("addProduct")
    @UseInterceptors(FileInterceptor("productImage"))
    async addProduct(@UploadedFile() file:any,@Body() body:any,@Res() res:Response){
        try {
            const product = await this.productService.addProduct(body,file);
            return res.status(200).send({product})
        } catch (error) {
            console.log("Error at product controller : ",error);
            return res.status(500).send({message:"Internal Server Error !!!"})
        }
    }

    @Put("purchaseProduct/:productId")
    async purchaseProduct(@Param() params:any,@Body() body:any,@Res() res:Response){
        try {
            
            const usetId = params.productId;
            const purchasedBy = body.purchasedBy;
            const purchased:any = await this.productService.purchaseProduct(usetId,purchasedBy);
            if(purchased==1) return res.status(200).send({message:"Product's Purchased Sucessfully !!!"})
            return res.status(200).send({message:"Something went wrong !!!"})
        } catch (error) {
            console.log("Error at product controller : ",error);
            return res.status(500).send({message:"Internal Server Error !!!"})
        }
    }

    @Put("update/:id")
    async updateProduct(@Param() param:any,@Body() body:any,@Res() res:Response){
        try {
            const productId = param.id
            const updated:any = await this.productService.updateProduct(productId,body);
            if(updated===1) return res.status(200).send({message:"Product's Details Updated Sucessfully !!!"})
            return res.status(200).send({message:"Product's Details Update Not Sucessfull !!!"})
        } catch (error) {
            console.log("Error at product controller : ",error);
            return res.status(500).send({message:"Internal Server Error !!!"})
        }
    }
}
