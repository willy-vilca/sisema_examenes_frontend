import {
    Navigate
} from "react-router-dom";

import LoadingSpinner from "../ui/LoadingSpinner";

import {
    useAuth
} from "../../context/AuthContext";

function ProtectedRoute({
    children
}) {

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

    return children;

}

export default ProtectedRoute;