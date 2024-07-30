import { Request, Response } from "express";
import { z } from "zod";
import { VariantSchema } from "../product/product.validation";
import { Variant } from "../product/product.model";

// Create Variant
const createVariant = async (req: Request, res: Response) => {
  try {
    const validatedData = VariantSchema.parse(req.body);
    const variant = new Variant(validatedData);
    await variant.save();
    res.status(201).json({
      message: "Variant created successfully!",
      variant,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// Get All Variants
const getAllVariant = async (req: Request, res: Response) => {
  try {
    const variants = await Variant.find();
    res.status(200).json(variants);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Variant by ID
const getVariantById = async (req: Request, res: Response) => {
  try {
    const variant = await Variant.findById(req.params.id);
    if (!variant) {
      return res.status(404).json({ error: "Variant not found" });
    }
    res.status(200).json(variant);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update Variant
const updateVariant = async (req: Request, res: Response) => {
  try {
    const validatedData = VariantSchema.parse(req.body);
    const variant = await Variant.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true, runValidators: true }
    );
    if (!variant) {
      return res.status(404).json({ error: "Variant not found" });
    }
    res.status(200).json(variant);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// Delete Variant
const deleteVariant = async (req: Request, res: Response) => {
  try {
    const variant = await Variant.findByIdAndDelete(req.params.id);
    if (!variant) {
      return res.status(404).json({ error: "Variant not found" });
    }
    res.status(200).json({ message: "Variant deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const variantController = {
  createVariant,
  getAllVariant,
  getVariantById,
  updateVariant,
  deleteVariant,
};
