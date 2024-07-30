import { Request, Response } from "express";
import { z } from "zod";
import { ProductSchema } from "./product.validation";
import { Product } from "./product.model";


// Create Product
const createProduct = async (req: Request, res: Response) => {
  console.log("first")
  try {
    const validatedData = ProductSchema.parse(req.body);
    const product = new Product(validatedData);
    await product.save();
    res.status(201).json({
      message: "Product created successfully!",
      product,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// Get All Products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().populate("supplierId");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Product by ID
const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "supplierId"
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update Product
const updateProduct = async (req: Request, res: Response) => {
  try {
    const validatedData = ProductSchema.parse(req.body);
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// Delete Product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const productController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
