import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import LoadingSpinner from "../ui/LoadingSpinner";

function AdminRoute({ children }) {

    const {
        usuario,
        loading
    } = useAuth();

    if (loading) {

        return <LoadingSpinner />;

    }

    if (!usuario) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }

    if (usuario.rol !== "ADMIN") {

        return (
            <Navigate
                to="/"
                replace
            />
        );

    }

    return children;

}

export default AdminRoute;