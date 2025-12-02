import { useState } from "react";
import axios from "axios";

function NuevoProducto() {
  const [form, setForm] = useState({
    codigo: "",
    nombre: "",
    cantidad: "",
    precio: "",
    ubicacion: "",
  });

  const [imagen, setImagen] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("codigo", form.codigo);
    data.append("nombre", form.nombre);
    data.append("cantidad", form.cantidad);
    data.append("precio", form.precio);
    data.append("ubicacion", form.ubicacion);
    data.append("imagen", imagen);

    try {
      await axios.post("http://localhost:3001/productos", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Producto registrado correctamente");
    } catch (error) {
      console.error(error);
      alert("Error al registrar producto");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Añadir Nuevo Producto
      </h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
        />

        <input
          type="text"
          name="codigo"
          placeholder="Código del producto"
          value={form.codigo}
          onChange={handleChange}
        />

        <input
          type="text"
          name="nombre"
          placeholder="Nombre del producto"
          value={form.nombre}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="cantidad"
          placeholder="Cantidad"
          value={form.cantidad}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="ubicacion"
          placeholder="Ubicación física"
          value={form.ubicacion}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Registrar Producto
        </button>
      </form>
    </div>
  );
}

export default NuevoProducto;
