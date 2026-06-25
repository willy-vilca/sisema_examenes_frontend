import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import authService from "../services/authService";

const AuthContext =
    createContext();

export function AuthProvider({
    children
}) {

    const [usuario, setUsuario] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        cargarUsuario();

    }, []);

    const cargarUsuario = async () => {

        try {

            const response =
                await authService.obtenerUsuario();

            setUsuario(response.data);

        } catch {

            setUsuario(null);

        } finally {

            setLoading(false);

        }

    };

    const login = async (credenciales) => {

        await authService.login(
            credenciales
        );

        await cargarUsuario();

    };

    const logout = async () => {

        await authService.logout();

        setUsuario(null);

    };

    return (

        <AuthContext.Provider
            value={{
                usuario,
                loading,
                login,
                logout,
                cargarUsuario,
                autenticado: usuario !== null,
                esAdministrador:
                    usuario?.rol === "ADMIN"
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(
        AuthContext
    );

}