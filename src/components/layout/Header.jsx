import { FaUserCircle } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

function Header() {

    const {
        usuario
    } = useAuth();

    return (

        <header
            className="
                bg-white
                border-b
                border-slate-300
                px-8
                py-4
                flex
                justify-between
                items-center
                shadow-sm
            "
        >

            <div>

                <h2
                    className="
                        text-2xl
                        font-bold
                        text-gray-800
                    "
                >
                    Sistema Generador de Exámenes
                </h2>

                <p
                    className="
                        text-sm
                        text-gray-500
                        mt-1
                    "
                >
                    Plataforma para la elaboración de exámenes de admisión
                </p>

            </div>

            <div
                className="
                    flex
                    items-center
                    gap-3
                "
            >

                <FaUserCircle
                    className="
                        text-4xl
                        text-blue-700
                    "
                />

                <div className="text-right">

                    <div
                        className="
                            font-semibold
                            text-gray-800
                        "
                    >
                        {usuario?.nombre}
                    </div>

                    <div
                        className="
                            text-sm
                            text-gray-500
                        "
                    >
                        {
                            usuario?.rol === "ADMIN"
                                ? "Administrador"
                                : "Usuario"
                        }
                    </div>

                </div>

            </div>

        </header>

    );

}

export default Header;