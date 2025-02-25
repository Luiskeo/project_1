import { auth, logout } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "../components/LanguajeSelector";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
    const { t } = useTranslation();
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/"); // Redirigir al login después de cerrar sesión
    };

    return (
        <div className="container">
            <LanguageSelector />
            <div className="container mt-5">
                <h1> {t("dashboard.title")}</h1>
                {user && (
                    <p>
                        {t("dashboard.user")}: {user.displayName || user.email}
                    </p>
                )}
                <button onClick={handleLogout} className="btn btn-danger">
                    {t("dashboard.logout")}
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
