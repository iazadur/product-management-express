import express, { Application } from "express";
import cors from "cors";
import { StudentRoutes } from "./app/modules/student/student.route";
import { SupplierRoutes } from "./app/modules/supplier/supplier.route";
import { ProductRoutes } from "./app/modules/product/product.route";
import { VariantRoutes } from "./app/modules/variant/variants.route";
import { StockRoutes } from "./app/modules/stock/stock.route";

const app: Application = express();

// perser json
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1/student", StudentRoutes);
app.use("/api/v1/suppliers", SupplierRoutes);
app.use("/api/v1/variants", VariantRoutes);
app.use("/api/v1/products", ProductRoutes);
app.use("/api/v1/stocks", StockRoutes);
// app.use("/api/v1/add-stocks", AddStockRoutes);

export default app;
