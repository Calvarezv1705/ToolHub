import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AnadirProducto from "./pages/AnadirProducto";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Bienvenido a ToolHub</h1>
              <Link to="/anadir-producto">Añadir Producto</Link>
            </div>
          }
        />
        <Route path="/anadir-producto" element={<AnadirProducto />} />
      </Routes>
    </Router>
  );
}

export default App;
