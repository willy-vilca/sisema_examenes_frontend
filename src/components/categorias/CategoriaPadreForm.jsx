import { useState } from "react";

import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";

function CategoriaPadreForm({
    categoriaInicial,
    onGuardar,
    onCancelar
}) {

    const [nombre, setNombre] = useState(
        categoriaInicial?.nombre || ""
    );

    const [descripcion, setDescripcion] = useState(
        categoriaInicial?.descripcion || ""
    );

    const handleSubmit = (e) => {

        e.preventDefault();

        onGuardar({
            nombre,
            descripcion
        });

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-4"
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
                        border-gray-300
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
                    Descripción
                </label>

                <textarea
                    value={descripcion}
                    onChange={(e) =>
                        setDescripcion(e.target.value)
                    }
                    rows="3"
                    className="
                        w-full
                        border
                        border-gray-300
                        rounded-lg
                        px-3
                        py-2
                    "
                />

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

export default CategoriaPadreForm;