import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import { FaEnvelope, FaLock } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

function LoginPage() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [correo, setCorreo] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const iniciarSesion = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await login({
                correo,
                password
            });

            navigate("/");

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Inicio de sesión",
                text:
                    error?.response?.data?.message ||
                    "Correo o contraseña incorrectos."
            });

        } finally {

            setLoading(false);

        }

    };

    return (

        <div
            className="
                min-h-screen
                bg-gray-100
                flex
                items-center
                justify-center
                p-6
            "
        >

            <div
                className="
                    bg-white
                    rounded-2xl
                    shadow-xl
                    w-full
                    max-w-md
                    p-10
                    border
                    border-gray-300
                "
            >

                <div className="text-center">

                    <div
                        className="
                            mx-auto
                            mb-6
                            w-20
                            h-20
                            rounded-full
                            bg-blue-100
                            flex
                            items-center
                            justify-center
                            text-blue-700
                            text-3xl
                            font-bold
                        "
                    >

                        U

                    </div>

                    <h1
                        className="
                            text-3xl
                            font-bold
                            text-gray-800
                        "
                    >
                        Sistema Generador
                    </h1>

                    <p
                        className="
                            mt-2
                            text-gray-500
                        "
                    >
                        Plataforma de generación de
                        exámenes de admisión
                    </p>

                </div>

                <form
                    onSubmit={iniciarSesion}
                    className="mt-10 space-y-5"
                >

                    <div>

                        <label
                            className="
                                block
                                text-sm
                                font-medium
                                mb-2
                                text-gray-700
                            "
                        >
                            Correo electrónico
                        </label>

                        <div
                            className="
                                flex
                                items-center
                                border
                                border-gray-300
                                rounded-lg
                                px-3
                                py-2
                            "
                        >

                            <FaEnvelope className="text-gray-400 mr-3"/>

                            <input
                                type="email"
                                value={correo}
                                onChange={(e)=>setCorreo(e.target.value)}
                                className="
                                    flex-1
                                    outline-none
                                "
                                required
                            />

                        </div>

                    </div>

                    <div>

                        <label
                            className="
                                block
                                text-sm
                                font-medium
                                mb-2
                                text-gray-700
                            "
                        >
                            Contraseña
                        </label>

                        <div
                            className="
                                flex
                                items-center
                                border
                                border-gray-300
                                rounded-lg
                                px-3
                                py-2
                            "
                        >

                            <FaLock className="text-gray-400 mr-3"/>

                            <input
                                type="password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                className="
                                    flex-1
                                    outline-none
                                "
                                required
                            />

                        </div>

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            bg-blue-700
                            hover:bg-blue-800
                            text-white
                            py-3
                            rounded-lg
                            transition
                            font-semibold
                        "
                    >

                        {
                            loading
                                ? "Ingresando..."
                                : "Ingresar"
                        }

                    </button>

                </form>

                <div
                    className="
                        mt-8
                        text-center
                        text-sm
                        text-gray-400
                    "
                >

                    © 2026 Sistema Generador de Exámenes

                </div>

            </div>

        </div>

    );

}

export default LoginPage;