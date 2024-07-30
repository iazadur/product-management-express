import { Types } from "mongoose";



export type ProductType = {
    title: string;
    description: string;
    price: number;
    supplierId: Types.ObjectId;
    isActive: "active" | "inactive";
};


export type VariantType = {
    title: string;
    description: string;
};

