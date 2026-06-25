import { useState } from "react";

import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";
import { useEffect } from "react";
import categoriaPadreService from "../../services/categoriaPadreService";

function CategoriaForm({

    categoriaInicial,

    onGuardar,

    onCancelar

}) {

    const [nombre, setNombre] =
        useState(
            categoriaInicial?.nombre || ""
        );

    const [descripcion, setDescripcion] =
        useState(
            categoriaInicial?.descripcion || ""
        );
    
    const [categoriasPadre, setCategoriasPadre] = useState([]);

    const [categoriaPadreId, setCategoriaPadreId] = useState(
        categoriaInicial?.categoriaPadreId || ""
    );

    const handleSubmit = (e) => {

        e.preventDefault();

        onGuardar({
            nombre,
            descripcion,
            categoriaPadreId:
                categoriaPadreId || null
        });

    };

    useEffect(() => {
        cargarCategoriasPadre();
    }, []);

    const cargarCategoriasPadre = async () => {

        try {
            const response = await categoriaPadreService.listar();
            setCategoriasPadre(response.data);
        } catch (error) {
            console.error(error);
        }

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
                        border-slate-300
                        rounded-lg
                        px-3
                        py-2
                    "
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
                    Categoría Padre
                </label>

                <select
                    value={categoriaPadreId}
                    onChange={(e) =>
                        setCategoriaPadreId(e.target.value)
                    }
                    className="
                        w-full
                        border
                        border-slate-300
                        rounded-lg
                        px-3
                        py-2
                    "
                >

                    <option value="">
                        Seleccione...
                    </option>

                    {
                        categoriasPadre.map(
                            (categoria) => (

                                <option
                                    key={categoria.id}
                                    value={categoria.id}
                                >
                                    {categoria.nombre}
                                </option>

                            )
                        )
                    }

                </select>

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

export default CategoriaForm;