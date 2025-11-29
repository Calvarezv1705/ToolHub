import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import productosRoutes from "./routes/productos.js";

const app = express();     // ✔ PRIMERO CREAS APP
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use("/productos", productosRoutes);   // ✔ LUEGO USAS LAS RUTAS

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

app.listen(3000, () => {
  console.log("Servidor backend en http://localhost:3000");
});
