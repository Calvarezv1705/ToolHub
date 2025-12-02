import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const crearProducto = async (req, res) => {
  try {
    const { codigo, nombre, cantidad, precio, ubicacion } = req.body;

    // Validaciones
    if (!codigo || !nombre || !cantidad || !precio || !ubicacion) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Debes subir una imagen" });
    }

    // Guardamos la URL de la imagen
    const imagenUrl = `/uploads/${req.file.filename}`;

    const producto = await prisma.producto.create({
      data: {
        codigo,
        nombre,
        cantidad: Number(cantidad),
        precio: Number(precio),
        ubicacion,
        imagen: imagenUrl, // Solo este campo debe ir
      },
    });

    res.json({
      message: "Producto registrado correctamente",
      producto,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
