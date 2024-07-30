import { Types } from "mongoose";
import { z } from "zod";

// Enum Definitions

const IsActiveEnum = ["active", "inactive"] as const;

// Supplier Validation Schema
export const SupplierSchema = z.object({
    name: z.string().min(1, { message: "Please provide a name" }).trim(),
    contactNumber: z.string().min(1, { message: "Please provide a contact number" }).trim(),
    email: z.string().min(1, { message: "Please provide an email" }).email({ message: "Please provide a valid email address" }).trim(),
    address: z.string().min(1, { message: "Please provide an address" }).trim(),
    isActive: z.enum(IsActiveEnum).default("active"),
});

// Product Validation Schema
export const ProductSchema = z.object({
    title: z.string().min(1, { message: "Please provide a title" }).trim(),
    description: z.string().min(1, { message: "Please provide a description" }).trim(),
    price: z.number().min(0, { message: "Price must be positive" }),
    supplierId: z.string().min(1, { message: "Please provide a supplier ID" }).refine(value => Types.ObjectId.isValid(value), { message: "Invalid ObjectId" }),
    isActive: z.enum(IsActiveEnum).default("active"),
});

// Variant Validation Schema
export const VariantSchema = z.object({
    title: z.string().min(1, { message: "Please provide a title" }).trim(),
    description: z.string().optional(),
});



// Add Stock Validation Schema
export const AddStockSchema = z.object({
    stockId: z.string().min(1, { message: "Please provide a stock ID" }).refine(value => Types.ObjectId.isValid(value), { message: "Invalid ObjectId" }),
    quantity: z.number().min(0, { message: "Quantity must be positive" }),
    price: z.number().min(0, { message: "Price must be positive" }),
    supplierId: z.string().min(1, { message: "Please provide a supplier ID" }).refine(value => Types.ObjectId.isValid(value), { message: "Invalid ObjectId" }),
});
