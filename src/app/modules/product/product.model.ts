import { Schema, model } from "mongoose";
import {  ProductType, VariantType } from "./product.interface";
// Enum Definitions
const IsActiveEnum = ["active", "inactive"];



// Product Schema
const ProductSchema = new Schema<ProductType>({
    title: { type: String, required: [true, "Please provide a title"], trim: true },
    description: { type: String, required: [true, "Please provide a description"], trim: true },
    price: { type: Number, required: [true, "Please provide a price"], min: [0, "Price must be positive"] },
    supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier', required: [true, "Please provide a supplier"] },
    isActive: { type: String, enum: IsActiveEnum, default: "active" },
}, { timestamps: true });

// Virtuals
ProductSchema.virtual('stocks', {
    ref: 'Stock',
    localField: '_id',
    foreignField: 'productId'
});

// Variant Schema
const VariantSchema = new Schema<VariantType>({
    title: { type: String, required: [true, "Please provide a title"], trim: true },
    description: { type: String, trim: true },
}, { timestamps: true });



// // Middleware
// ProductSchema.pre('remove', async function(next) {
//     await Stock.deleteMany({ productId: this._id });
//     next();
// });

// SupplierSchema.pre('remove', async function(next) {
//     await Product.deleteMany({ supplierId: this._id });
//     next();
// });

// Indexes
ProductSchema.index({ title: 1, supplierId: 1 });


// Product Model
export const Product = model<ProductType>('Product', ProductSchema);
// Variant Model
export const Variant = model<VariantType>('Variant', VariantSchema);

