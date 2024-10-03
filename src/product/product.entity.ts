import { Schema } from "mongoose";

export const productSchema = new Schema({
    productName:String,
    productImage:String,
    productPrice:String,
    productQuanity:String,
    purchasedBy:[String],
    providedBy:String
})
