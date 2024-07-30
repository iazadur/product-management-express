import express from "express";
import { productController } from "./product.controller";

const router = express.Router();

// will call controller
export const ProductRoutes = router
  .post("/", productController.createProduct)
  .get("/", productController.getAllProducts)
  .get("/:id", productController.getProductById)
  .put("/:id", productController.updateProduct)
  .delete("/:id", productController.deleteProduct);
