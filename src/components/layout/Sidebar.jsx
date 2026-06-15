import { NavLink } from "react-router-dom";

import {
    FaHome,
    FaFolderOpen,
    FaBook,
    FaQuestionCircle,
    FaFileAlt
} from "react-icons/fa";

function Sidebar() {

    const menuItemClass =
        ({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition
            ${
                isActive
                    ? "bg-blue-700 text-white"
                    : "text-gray-300 hover:bg-slate-700"
            }`;

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

            </nav>

        </aside>
    );
}

export default Sidebar;