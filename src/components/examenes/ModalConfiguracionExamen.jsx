import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import examenService from "../../services/examenService";

function ModalConfiguracionExamen({
    open,
    onClose,
    procesoId,
    nombreExamen,
    onGenerar
}) {

    const [categorias, setCategorias] = useState([]);

    const [cantidadTemas, setCantidadTemas] = useState(1);

    useEffect(() => {

        if (open && procesoId) {
            cargarCategorias();
        }

    }, [open, procesoId]);

    const cargarCategorias = async () => {

        try {

            const data =
                await examenService
                    .obtenerCategoriasDisponibles(
                        procesoId
                    );

            const categoriasIniciales =
                data.map((cat) => ({
                    ...cat,
                    cantidadSeleccionada:
                        cat.cantidadPreguntas
                }));

            setCategorias(
                categoriasIniciales
            );

        } catch (error) {

            console.error(error);

            Swal.fire(
                "Error",
                "No se pudieron cargar las categorías",
                "error"
            );

        }

    };

    const actualizarCantidad = (
        categoriaId,
        valor
    ) => {

        const numero =
            Number(valor);

        setCategorias((prev) =>
            prev.map((cat) => {

                if (cat.categoriaId !== categoriaId) {
                    return cat;
                }

                if (
                    numero >
                    cat.cantidadPreguntas
                ) {

                    Swal.fire(
                        "Cantidad inválida",
                        `Solo existen ${cat.cantidadPreguntas} preguntas disponibles`,
                        "warning"
                    );

                    return cat;
                }

                return {
                    ...cat,
                    cantidadSeleccionada:
                        numero
                };

            })
        );

    };

    const generarExamen = () => {

        const categoriasSeleccionadas =
            categorias
                .filter(
                    (c) =>
                        c.cantidadSeleccionada > 0
                )
                .map((c) => ({
                    categoriaId:
                        c.categoriaId,

                    cantidadPreguntas:
                        c.cantidadSeleccionada
                }));

        if (
            categoriasSeleccionadas.length === 0
        ) {

            Swal.fire(
                "Validación",
                "Debe seleccionar al menos una categoría",
                "warning"
            );

            return;
        }

        onGenerar({
            nombreExamen: nombreExamen,
            procesoId: Number(procesoId),
            cantidadTemas,
            categorias:
                categoriasSeleccionadas
        });

    };

    if (!open) {
        return null;
    }

    return (

        <div
            className="
                fixed inset-0
                bg-black/50
                flex items-center justify-center
                z-50
            "
        >

            <div
                className="
                    bg-white
                    rounded-xl
                    shadow-xl
                    w-full
                    max-w-4xl
                    p-6
                "
            >

                <div className="mb-6">

                    <h2
                        className="
                            text-xl
                            font-semibold
                            text-slate-800
                        "
                    >
                        Configuración del Examen
                    </h2>

                    <p
                        className="
                            text-sm
                            text-slate-500
                            mt-1
                        "
                    >
                        Configure la cantidad de preguntas por categoría.
                    </p>

                </div>

                <div className="overflow-x-auto">

                    <table
                        className="
                            w-full
                            border
                            border-slate-200
                        "
                    >

                        <thead>

                            <tr
                                className="
                                    bg-slate-100
                                "
                            >

                                <th className="p-3 text-left">
                                    Categoría
                                </th>

                                <th className="p-3 text-center">
                                    Disponibles
                                </th>

                                <th className="p-3 text-center">
                                    Incluir
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {categorias.map((cat) => (

                                <tr
                                    key={cat.categoriaId}
                                    className="
                                        border-t
                                    "
                                >

                                    <td className="p-3">
                                        {cat.categoriaNombre}
                                    </td>

                                    <td className="p-3 text-center">
                                        {cat.cantidadPreguntas}
                                    </td>

                                    <td className="p-3 text-center">

                                        <input
                                            type="number"
                                            min="0"
                                            max={
                                                cat.cantidadPreguntas
                                            }
                                            value={
                                                cat.cantidadSeleccionada
                                            }
                                            onChange={(e) =>
                                                actualizarCantidad(
                                                    cat.categoriaId,
                                                    e.target.value
                                                )
                                            }
                                            className="
                                                w-24
                                                border
                                                rounded-lg
                                                px-2
                                                py-1
                                                text-center
                                            "
                                        />

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                <div className="mt-6">

                    <label
                        className="
                            block
                            text-sm
                            font-medium
                            text-slate-700
                            mb-2
                        "
                    >
                        Cantidad de Temas
                    </label>

                    <input
                        type="number"
                        min="1"
                        value={cantidadTemas}
                        onChange={(e) =>
                            setCantidadTemas(
                                Number(
                                    e.target.value
                                )
                            )
                        }
                        className="
                            border
                            rounded-lg
                            px-4
                            py-2
                            w-40
                        "
                    />

                </div>

                <div
                    className="
                        flex
                        justify-end
                        gap-3
                        mt-8
                    "
                >

                    <button
                        onClick={onClose}
                        className="
                            px-4 py-2
                            border
                            rounded-lg
                        "
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={generarExamen}
                        className="
                            px-4 py-2
                            bg-slate-800
                            text-white
                            rounded-lg
                            hover:bg-slate-700
                        "
                    >
                        Generar Examen
                    </button>

                </div>

            </div>

        </div>

    );

}

export default ModalConfiguracionExamen;