import express from "express";
import { supplierController } from "./supplier.controller";


const router = express.Router();

// will call controller
router
.post("/", supplierController.createSupplier) // Create Supplier
.get("/", supplierController.getAllSupplier) // Get All Suppliers
.get("/:id", supplierController.getSupplierById) // Get Supplier by ID
.put("/:id", supplierController.updateSupplier) // Update Supplier
.delete("/:id", supplierController.deleteSupplier); // Delete Supplier



export const SupplierRoutes = router;
