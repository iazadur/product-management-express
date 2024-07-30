import { model, Schema } from "mongoose";
import { SupplierType } from "./supplier.interface";

// Enum Definitions
const IsActiveEnum = ["active", "inactive"];

// Supplier Schema
const SupplierSchema = new Schema<SupplierType>({
    name: { type: String, required: [true, "Please provide a name"], trim: true },
    contactNumber: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true, match: [/\S+@\S+\.\S+/, "Please provide a valid email address"] },
    address: { type: String, required: true, trim: true },
    isActive: { type: String, enum: IsActiveEnum, default: "active" },
}, { timestamps: true });

// Virtuals
SupplierSchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'supplierId'
});


// Supplier Model
export const Supplier = model<SupplierType>('Supplier', SupplierSchema);