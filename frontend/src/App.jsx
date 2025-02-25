// Importa componentes de React Router para manejar la navegación en la aplicación
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importa los componentes de la aplicación que representan diferentes páginas o vistas
import Login from "./pages/Login"; // Página de inicio de sesión
import AuthForm from "./components/AuthForm"; // Formulario de autenticación
import Dashboard from "./pages/Dashboard";

// Importa la hoja de estilos de Bootstrap para usar su sistema de diseño y estilos predefinidos
import "bootstrap/dist/css/bootstrap.min.css";

// Define el componente principal `App`, que contiene la estructura de navegación de la aplicación
const App = () => {
    return (
        // Define el enrutador de la aplicación, permitiendo la navegación entre distintas páginas
        <Router>
            <Routes>
                {/* Ruta principal que renderiza el componente Home cuando la URL es "/" */}
                <Route path="/" element={<Login />} />

                {/* Ruta para la pantalla de inicio de sesión */}
                <Route path="/login" element={<Login />} />

                {/* Ruta para la pantalla de autenticación */}
                <Route path="/auth" element={<AuthForm />} />

                {/* Ruta para el dashboard */}
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

// Exporta el componente App para que pueda ser usado en `index.js` como punto de entrada de la aplicación
export default App;
