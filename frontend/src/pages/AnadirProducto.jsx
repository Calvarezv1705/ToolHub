import { useState } from "react";
import axios from "axios";

export default function AnadirProducto() {
  // Estado para cada campo del formulario
  const [imagen, setImagen] = useState(null);
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [ubicacion, setUbicacion] = useState("");

  // Para mensajes al usuario
  const [mensaje, setMensaje] = useState("");

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas (frontend)
    if (!codigo || !nombre || !cantidad || !precio || !ubicacion) {
      setMensaje("⚠️ Debes llenar todos los campos");
      return;
    }

    if (!imagen) {
      setMensaje("⚠️ Debes subir una imagen");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("imagen", imagen);
      formData.append("codigo", codigo);
      formData.append("nombre", nombre);
      formData.append("cantidad", cantidad);
      formData.append("precio", precio);
      formData.append("ubicacion", ubicacion);

      const res = await axios.post("http://localhost:3001/productos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMensaje("✅ Producto registrado con éxito");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al registrar el producto");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Añadir Producto</h1>

      {mensaje && <p>{mensaje}</p>}

      <form onSubmit={handleSubmit}>
        <label>Imagen:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagen(e.target.files[0])}
        />
        <br /><br />

        <label>Código:</label>
        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
        <br /><br />

        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <br /><br />

        <label>Cantidad:</label>
        <input
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />
        <br /><br />

        <label>Precio:</label>
        <input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <br /><br />

        <label>Ubicación física:</label>
        <input
          type="text"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
        />
        <br /><br />

        <button type="submit">Guardar Producto</button>
      </form>
    </div>
  );
}
