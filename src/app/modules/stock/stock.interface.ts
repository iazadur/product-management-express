import { Types } from "mongoose";

export type StockType = {
    productId: Types.ObjectId;
    variantId: Types.ObjectId;
    quantity: number;
    price: number;
    sellingQuantity: number;
    status: "available" | "out of stock" | "coming soon" | "discontinued";
};

export type AddStockType = {
    stockId: Types.ObjectId;
    quantity: number;
    price: number;
    supplierId: Types.ObjectId;
};