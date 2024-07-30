import express from "express";
import { variantController } from "./variant.controller";
const router = express.Router();
router
  .post("/", variantController.createVariant)
  .get("/", variantController.getAllVariant)
  .get("/:id", variantController.getVariantById)
  .put("/:id", variantController.updateVariant)
  .delete("/:id", variantController.deleteVariant);

export const VariantRoutes = router;
