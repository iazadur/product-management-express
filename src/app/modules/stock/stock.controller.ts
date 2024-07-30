import { Request, Response } from "express";
import { z } from "zod";
import { StockSchema } from "./stock.validation";
import { Stock } from "./stock.model";


// Create Stock
const createStock = async (req: Request, res: Response) => {
  try {
    const validatedData = StockSchema.parse(req.body);
    const stock = new Stock(validatedData);
    await stock.save();
    res.status(201).json(stock);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// Get All Stocks
const getAllStock = async (req: Request, res: Response) => {
  try {
    const stocks = await Stock.find().populate("productId variantId");
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Stock by ID
const getStockById = async (req: Request, res: Response) => {
  try {
    const stock = await Stock.findById(req.params.id).populate(
      "productId variantId"
    );
    if (!stock) {
      return res.status(404).json({ error: "Stock not found" });
    }
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update Stock
const updateStock = async (req: Request, res: Response) => {
  try {
    const validatedData = StockSchema.parse(req.body);
    const stock = await Stock.findByIdAndUpdate(req.params.id, validatedData, {
      new: true,
      runValidators: true,
    });
    if (!stock) {
      return res.status(404).json({ error: "Stock not found" });
    }
    res.status(200).json(stock);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// Delete Stock
const deleteStock = async (req: Request, res: Response) => {
  try {
    const stock = await Stock.findByIdAndDelete(req.params.id);
    if (!stock) {
      return res.status(404).json({ error: "Stock not found" });
    }
    res.status(200).json({ message: "Stock deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const stockController = {
  createStock,
  getAllStock,
  getStockById,
  updateStock,
  deleteStock,
};
