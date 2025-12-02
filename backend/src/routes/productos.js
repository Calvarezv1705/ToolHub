import { Router } from "express";
import multer from "multer";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// Configuración Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }); // SOLO ESTA debe existir

// Ruta para crear producto
router.post("/", upload.single("imagen"), async (req, res) => {
  try {
    const { codigo, nombre, cantidad, precio, ubicacion } = req.body;

    if (!codigo || !nombre || !cantidad || !precio || !ubicacion) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Debes subir una imagen" });
    }

    const imagenUrl = `/uploads/${req.file.filename}`;

    const producto = await prisma.producto.create({
      data: {
        codigo,
        nombre,
        cantidad: Number(cantidad),
        precio: Number(precio),
        ubicacion,
        imagen: imagenUrl,
      },
    });

    res.json({ message: "Producto registrado", producto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Ruta para añadir producto
router.post('/añadir-producto', upload.single('imagen'), async (req, res) => {
    try {
        const { codigo, nombre, cantidad, precio, ubicacion } = req.body;
        const imagenPath = req.file ? `/uploads/${req.file.filename}` : null;

        const producto = await prisma.producto.create({
            data: {
                codigo,
                nombre,
                cantidad: Number(cantidad),
                precio: Number(precio),
                ubicacion,
                imagen: imagenPath
            }
        });

        return res.status(201).json(producto);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al registrar el producto' });
    }
});

export default router;
