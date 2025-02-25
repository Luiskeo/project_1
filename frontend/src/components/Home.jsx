
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="container text-center mt-5">
      <div className="card shadow p-4">
        <h1 className="text-primary">🏠 Página de Inicio</h1>
        {user ? <p className="fs-5 fw-bold">Bienvenido, {user.displayName}</p> : <p className="fs-5 text-muted">Cargando...</p>}
      </div>
    </div>
  );
};

export default Home;
