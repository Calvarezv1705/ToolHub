import express from "express";
import cors from "cors";
import productosRoutes from "./routes/productos.js";

const app = express();

// Middlewares principales
app.use(cors());
app.use(express.json());

// Carpeta de imágenes accesible desde el navegador
app.use("/uploads", express.static("uploads"));

// Rutas
app.use("/productos", productosRoutes);

// Servidor
app.listen(3001, () => {
  console.log("Servidor corriendo en puerto 3001");
});
