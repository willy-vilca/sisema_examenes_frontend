import { NavLink, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import {
    FaHome,
    FaFolderOpen,
    FaBook,
    FaQuestionCircle,
    FaFileAlt,
    FaUsers,
    FaSignOutAlt
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

function Sidebar() {

    const navigate = useNavigate();

    const {
        logout,
        esAdministrador
    } = useAuth();

    const menuItemClass =
        ({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition
            ${
                isActive
                    ? "bg-blue-700 text-white"
                    : "text-gray-300 hover:bg-slate-700"
            }`;

    const cerrarSesion = async () => {

        const resultado =
            await Swal.fire({
                title: "Cerrar sesión",
                text: "¿Desea cerrar la sesión actual?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Sí, cerrar sesión",
                cancelButtonText: "Cancelar"
            });

        if (!resultado.isConfirmed) {
            return;
        }

        try {

            await logout();

            navigate("/login", {
                replace: true
            });

        } catch {

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo cerrar la sesión."
            });

        }

    };

    return (

        <aside className="w-64 bg-slate-800 text-white flex flex-col">

            <div className="p-6 border-b border-slate-700">

                <h1 className="text-xl font-bold">

                    Sistema Exámenes

                </h1>

            </div>

            <nav className="flex-1 p-4 space-y-2">

                <NavLink
                    to="/"
                    className={menuItemClass}
                >
                    <FaHome />
                    Dashboard
                </NavLink>

                <NavLink
                    to="/procesos"
                    className={menuItemClass}
                >
                    <FaFolderOpen />
                    Procesos
                </NavLink>

                <NavLink
                    to="/categorias"
                    className={menuItemClass}
                >
                    <FaBook />
                    Categorías
                </NavLink>

                <NavLink
                    to="/preguntas"
                    className={menuItemClass}
                >
                    <FaQuestionCircle />
                    Preguntas
                </NavLink>

                <NavLink
                    to="/examenes"
                    className={menuItemClass}
                >
                    <FaFileAlt />
                    Exámenes
                </NavLink>

                {
                    esAdministrador && (

                        <NavLink
                            to="/usuarios"
                            className={menuItemClass}
                        >
                            <FaUsers />
                            Gestión de Usuarios
                        </NavLink>

                    )
                }

            </nav>

            <div className="p-4 border-t border-slate-700">

                <button
                    onClick={cerrarSesion}
                    className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        rounded-lg
                        text-gray-300
                        hover:bg-red-700
                        hover:text-white
                        transition
                    "
                >

                    <FaSignOutAlt />

                    Cerrar sesión

                </button>

            </div>

        </aside>

    );

}

export default Sidebar;