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

