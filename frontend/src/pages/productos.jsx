import { useEffect, useState } from "react";
import api from "../services/api";

function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    api.get("/productos").then(res => setProductos(res.data));
  }, []);

  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {productos.map(p => (
          <li key={p.id}>{p.nombre} — {p.cantidad} unidades</li>
        ))}
      </ul>
    </div>
  );
}

export default Productos;
