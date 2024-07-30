import { Types } from "mongoose";
import { z } from "zod";


const StatusEnum = ["available", "out of stock", "coming soon", "discontinued"] as const;

// Stock Validation Schema
export const StockSchema = z.object({
    productId: z.string().min(1, { message: "Please provide a product ID" }).refine(value => Types.ObjectId.isValid(value), { message: "Invalid ObjectId" }),
    variantId: z.string().min(1, { message: "Please provide a variant ID" }).refine(value => Types.ObjectId.isValid(value), { message: "Invalid ObjectId" }),
    quantity: z.number().min(0, { message: "Quantity must be positive" }),
    price: z.number().min(0, { message: "Price must be positive" }),
    sellingQuantity: z.number().min(0, { message: "Selling quantity must be positive" }),
    status: z.enum(StatusEnum).default("available"),
});