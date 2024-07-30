import { ProductType } from "./product.interface"
import { Product } from "./product.model"

const getAllProductsFromDB = async () =>{
    const products = await Product.find()
    return products
}

// create product
const createProductIntoDB = async (product:ProductType) =>{
    const result =  await Product.create(product)
    return result
}

export const productServices = {
    getAllProductsFromDB,
    createProductIntoDB
}