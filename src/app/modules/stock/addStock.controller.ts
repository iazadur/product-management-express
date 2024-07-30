import { Request, Response } from "express";

import { z } from "zod";
import { AddStockSchema } from "../product/product.validation";
import { AddStock } from "./stock.model";

// Create AddStock
const createAddStock = async (req: Request, res: Response) => {
  try {
    const validatedData = AddStockSchema.parse(req.body);
    const addStock = new AddStock(validatedData);
    await addStock.save();
    res.status(201).json(addStock);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// Get All AddStocks
const getAllAddStock = async (req: Request, res: Response) => {
  try {
    const addStocks = await AddStock.find().populate("stockId supplierId");
    res.status(200).json(addStocks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get AddStock by ID
const getAddStockById = async (req: Request, res: Response) => {
  try {
    const addStock = await AddStock.findById(req.params.id).populate(
      "stockId supplierId"
    );
    if (!addStock) {
      return res.status(404).json({ error: "AddStock not found" });
    }
    res.status(200).json(addStock);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update AddStock
const updateAddStock = async (req: Request, res: Response) => {
  try {
    const validatedData = AddStockSchema.parse(req.body);
    const addStock = await AddStock.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true, runValidators: true }
    );
    if (!addStock) {
      return res.status(404).json({ error: "AddStock not found" });
    }
    res.status(200).json(addStock);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// Delete AddStock
const deleteAddStock = async (req: Request, res: Response) => {
  try {
    const addStock = await AddStock.findByIdAndDelete(req.params.id);
    if (!addStock) {
      return res.status(404).json({ error: "AddStock not found" });
    }
    res.status(200).json({ message: "AddStock deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addStockController = {
  createAddStock,
  getAllAddStock,
  getAddStockById,
  updateAddStock,
  deleteAddStock,
};
