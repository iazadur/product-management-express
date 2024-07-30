import { Schema, model } from "mongoose";
import { AddStockType, StockType } from "./stock.interface";
// Enum Definitions
const StatusEnum = ["available", "out of stock", "coming soon", "discontinued"];



// Stock Schema
const StockSchema = new Schema<StockType>({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: [true, "Please provide a product"] },
    variantId: { type: Schema.Types.ObjectId, ref: 'Variant', required: [true, "Please provide a variant"] },
    quantity: { type: Number, required: [true, "Please provide a quantity"], min: [0, "Quantity must be positive"] },
    price: { type: Number, required: [true, "Please provide a price"], min: [0, "Price must be positive"] },
    sellingQuantity: { type: Number, required: [true, "Please provide a selling quantity"], min: [0, "Selling quantity must be positive"] },
    status: { type: String, enum: StatusEnum, default: "available" },
}, { timestamps: true });

// Add Stock Schema
const AddStockSchema = new Schema<AddStockType>({
    stockId: { type: Schema.Types.ObjectId, ref: 'Stock', required: [true, "Please provide a stock"] },
    quantity: { type: Number, required: [true, "Please provide a quantity"], min: [0, "Quantity must be positive"] },
    price: { type: Number, required: [true, "Please provide a price"], min: [0, "Price must be positive"] },
    supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier', required: [true, "Please provide a supplier"] },
}, { timestamps: true });

// Indexes
StockSchema.index({ productId: 1, variantId: 1 });

// Stock Model
export const Stock = model<StockType>('Stock', StockSchema);
// Add Stock Model
export const AddStock = model<AddStockType>('AddStock', AddStockSchema);