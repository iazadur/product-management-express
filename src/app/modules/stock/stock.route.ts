import express from "express";
import { stockController } from "./stock.controller";
import { addStockController } from "./addStock.controller";

const router = express.Router();
export const StockRoutes = router
  .post("/", stockController.createStock)
  .get("/", stockController.getAllStock)
  .get("/:id", stockController.getStockById)
  .put("/:id", stockController.updateStock)
  .delete("/:id", stockController.deleteStock)
  .post("/add-stock", addStockController.createAddStock)
  .get("/add-stock", addStockController.getAllAddStock)
  .get("/add-stock/:id", addStockController.getAddStockById)
  .put("/add-stock/:id", addStockController.updateAddStock)
  .delete("/add-stock/:id", addStockController.deleteAddStock);
