import { useEffect, useState } from "react";

import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";

function UsuarioForm({

    usuarioInicial,

    onGuardar,

    onCancelar

}) {

    const [nombre, setNombre] = useState("");

    const [correo, setCorreo] = useState("");

    const [password, setPassword] = useState("");

    const [rol, setRol] = useState("USUARIO");

    useEffect(() => {

        if (!usuarioInicial) {

            setNombre("");
            setCorreo("");
            setPassword("");
            setRol("USUARIO");

            return;

        }

        setNombre(usuarioInicial.nombre);
        setCorreo(usuarioInicial.correo);
        setPassword("");
        setRol(usuarioInicial.rol);

    }, [usuarioInicial]);

    const handleSubmit = (e) => {

        e.preventDefault();

        onGuardar({

            nombre,

            correo,

            password,

            rol

        });

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >

            <div
                className="
                    grid
                    grid-cols-2
                    gap-6
                "
            >

                <div>

                    <label
                        className="
                            block
                            text-sm
                            font-medium
                            text-gray-700
                            mb-1
                        "
                    >
                        Nombre
                    </label>

                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) =>
                            setNombre(e.target.value)
                        }
                        className="
                            w-full
                            border
                            border-slate-300
                            rounded-lg
                            px-3
                            py-2
                        "
                        required
                    />

                </div>

                <div>

                    <label
                        className="
                            block
                            text-sm
                            font-medium
                            text-gray-700
                            mb-1
                        "
                    >
                        Correo electrónico
                    </label>

                    <input
                        type="email"
                        value={correo}
                        onChange={(e) =>
                            setCorreo(e.target.value)
                        }
                        className="
                            w-full
                            border
                            border-slate-300
                            rounded-lg
                            px-3
                            py-2
                        "
                        required
                    />

                </div>

                <div>

                    <label
                        className="
                            block
                            text-sm
                            font-medium
                            text-gray-700
                            mb-1
                        "
                    >
                        Contraseña
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="
                            w-full
                            border
                            border-slate-300
                            rounded-lg
                            px-3
                            py-2
                        "
                        required={!usuarioInicial}
                    />

                    {

                        usuarioInicial && (

                            <p
                                className="
                                    text-xs
                                    text-gray-500
                                    mt-1
                                "
                            >
                                Deje este campo vacío si desea conservar la contraseña actual.
                            </p>

                        )

                    }

                </div>

                <div>

                    <label
                        className="
                            block
                            text-sm
                            font-medium
                            text-gray-700
                            mb-1
                        "
                    >
                        Rol
                    </label>

                    <select
                        value={rol}
                        onChange={(e) =>
                            setRol(e.target.value)
                        }
                        className="
                            w-full
                            border
                            border-slate-300
                            rounded-lg
                            px-3
                            py-2
                        "
                        required
                    >

                        <option value="USUARIO">
                            Usuario
                        </option>

                        <option value="ADMIN">
                            Administrador
                        </option>

                    </select>

                </div>

            </div>

            <div
                className="
                    flex
                    justify-end
                    gap-3
                "
            >

                <SecondaryButton
                    onClick={onCancelar}
                >
                    Cancelar
                </SecondaryButton>

                <PrimaryButton
                    type="submit"
                >
                    Guardar
                </PrimaryButton>

            </div>

        </form>

    );

}

export default UsuarioForm;