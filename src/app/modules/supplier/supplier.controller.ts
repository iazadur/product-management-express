import { Request, Response } from "express";

import { z } from "zod";
import { SupplierSchema } from "./supplier.validation";
import { Supplier } from "./supplier.model";



// Create Supplier
const createSupplier = async (req: Request, res: Response) => {
  try {
    const validatedData = SupplierSchema.parse(req.body);
    const supplier = new Supplier(validatedData);
    await supplier.save();
    res.status(201).json({
        message: "Supplier created successfully",
        supplier,
    });
  } catch (err: any) {
    // If the error is from Zod validation, send a 400 status with the validation error message
    if (err.errors) {
      return res.status(400).json({ errors: err.errors });
  }
  
  // Check if the error is a MongoDB duplicate key error
  if (err.code === 11000) {
      return res.status(400).json({ message: 'Email address already exists' });
  }
  
  // For other errors, send a 500 status with a generic message
  res.status(500).json({ message: 'Internal server error' });
  }
};

// Get All Suppliers
const getAllSupplier = async (req: Request, res: Response) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Supplier by ID
const getSupplierById = async (req: Request, res: Response) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }
    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Update Supplier
const updateSupplier = async (req: Request, res: Response) => {
  try {
    const validatedData = SupplierSchema.parse(req.body);
    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true, runValidators: true }
    );
    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }
    res.status(200).json(supplier);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

// Delete Supplier
const deleteSupplier =  async (req: Request, res: Response) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }
    res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const supplierController = {
    createSupplier,
    getAllSupplier,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
    };
