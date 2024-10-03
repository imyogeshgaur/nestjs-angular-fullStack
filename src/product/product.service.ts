import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import AWS, { S3 } from "aws-sdk"
import { resolve } from "path"
import { config } from "dotenv"
import { FileService } from 'src/file/file.service';
config({ path: resolve("./.env") })

@Injectable()
export class ProductService {

    private s3: S3;

    constructor(
        @Inject("PRODUCT_MODDEL")
        private readonly productModel: Model<Product>,
        private readonly fileService:FileService
    ) {}

    async getAllProducts() {
        try {
            const products = await this.productModel.find();
            return products;
        } catch (error) {
            console.log("Product service error: ");
        }
    }

    async getSingleProduct(id: string) {
        try {
            const product = await this.productModel.findById(id);
            return product;
        } catch (error) {
            console.log("Product service error: ");
        }
    }

    async addProduct(data: Product, file:any) {
        try {
            const url = await this.fileService.uploadFile(file);
            if(url){
                const newProduct = this.productModel.create({...data,productImage:url})
                const product = (await newProduct).save();
                return product;
            }
        } catch (error) {
            console.log("Product service error: ",error);
        }
    }

    async purchaseProduct(id: string, purchasedBy: string) {
        try {
            const purchased = await this.productModel.updateOne({_id:id},{purchasedBy})
            return purchased.modifiedCount
        } catch (error) {
            console.log("Product service error: ");
        }
    }
    async updateProduct(id: string, data: any) {
        try {
            const updatedProduct = await this.productModel.updateOne({_id:id},{...data});
            return updatedProduct.modifiedCount
        } catch (error) {
            console.log("Product service error: ");
        }
    }
}
