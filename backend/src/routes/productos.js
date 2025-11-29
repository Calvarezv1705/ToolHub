import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();

// Obtener todos
router.get("/", async (req, res) => {
  const productos = await prisma.producto.findMany();
  res.json(productos);
});

// Crear
router.post("/", async (req, res) => {
  const { nombre, cantidad, precio } = req.body;
  const producto = await prisma.producto.create({
    data: { nombre, cantidad, precio }
  });
  res.json(producto);
});

// Actualizar
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, cantidad, precio } = req.body;

  const producto = await prisma.producto.update({
    where: { id: Number(id) },
    data: { nombre, cantidad, precio },
  });

  res.json(producto);
});

// Eliminar
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.producto.delete({
    where: { id: Number(id) },
  });
  res.json({ message: "Producto eliminado" });
});

export default router;
