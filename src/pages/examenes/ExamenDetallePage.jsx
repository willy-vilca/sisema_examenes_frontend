import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    FileDown,
    BookOpen,
    Layers3
} from "lucide-react";

import examenService from "../../services/examenService";

function ExamenDetallePage() {

    const { id } = useParams();

    const [detalle, setDetalle] =
        useState(null);

    useEffect(() => {

        cargarDetalle();

    }, []);

    const cargarDetalle = async () => {

        try {

            const data =
                await examenService
                    .obtenerDetalle(id);

            setDetalle(data);

        } catch (error) {

            console.error(error);

        }

    };

    if (!detalle) {

        return (

            <div className="text-center py-10">
                Cargando...
            </div>

        );

    }

    return (

        <div className="space-y-6">

            {/* INFORMACIÓN GENERAL */}

            <div
                className="
                    bg-white
                    rounded-xl
                    shadow-sm
                    border
                    border-slate-200
                    p-6
                "
            >

                <h1
                    className="
                        text-2xl
                        font-bold
                        text-slate-800
                        mb-6
                    "
                >
                    Detalle del Examen
                </h1>

                <div
                    className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        gap-4
                    "
                >

                    <div>

                        <p className="text-slate-500">
                            Nombre
                        </p>

                        <p className="font-semibold">
                            {detalle.nombre}
                        </p>

                    </div>

                    <div>

                        <p className="text-slate-500">
                            Proceso
                        </p>

                        <p className="font-semibold">
                            {detalle.procesoNombre}
                        </p>

                    </div>

                    <div>

                        <p className="text-slate-500">
                            Usuario
                        </p>

                        <p className="font-semibold">
                            {detalle.usuarioNombre}
                        </p>

                    </div>

                    <div>

                        <p className="text-slate-500">
                            Fecha
                        </p>

                        <p className="font-semibold">

                            {
                                new Date(
                                    detalle.fechaGeneracion
                                ).toLocaleString()
                            }

                        </p>

                    </div>

                    <div>

                        <p className="text-slate-500">
                            Cantidad de Temas
                        </p>

                        <p className="font-semibold">
                            {detalle.cantidadTemas}
                        </p>

                    </div>

                </div>

            </div>

            {/* CATEGORÍAS */}

            <div
                className="
                    bg-white
                    rounded-xl
                    shadow-sm
                    border
                    border-slate-200
                "
            >

                <div
                    className="
                        p-5
                        border-b
                        flex
                        items-center
                        gap-2
                    "
                >

                    <BookOpen size={18} />

                    <h2
                        className="
                            font-semibold
                            text-slate-800
                        "
                    >
                        Categorías Incluidas
                    </h2>

                </div>

                <div className="p-5">

                    <table className="w-full">

                        <thead>

                            <tr>

                                <th className="text-left pb-3">
                                    Categoría
                                </th>

                                <th className="text-right pb-3">
                                    Preguntas
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                detalle.categorias.map(
                                    (categoria) => (

                                        <tr
                                            key={
                                                categoria.categoriaId
                                            }
                                            className="
                                                border-t
                                            "
                                        >

                                            <td className="py-3">

                                                {
                                                    categoria.categoriaNombre
                                                }

                                            </td>

                                            <td
                                                className="
                                                    py-3
                                                    text-right
                                                "
                                            >

                                                {
                                                    categoria.cantidadPreguntas
                                                }

                                            </td>

                                        </tr>

                                    )
                                )
                            }

                        </tbody>

                    </table>

                </div>

            </div>

            {/* TEMAS */}

            <div
                className="
                    bg-white
                    rounded-xl
                    shadow-sm
                    border
                    border-slate-200
                "
            >

                <div
                    className="
                        p-5
                        border-b
                        flex
                        items-center
                        gap-2
                    "
                >

                    <Layers3 size={18} />

                    <h2
                        className="
                            font-semibold
                            text-slate-800
                        "
                    >
                        Temas Generados
                    </h2>

                </div>

                <div className="p-5">

                    <div className="space-y-3">

                        {
                            detalle.temas.map(
                                (tema) => (

                                    <div
                                        key={tema.id}
                                        className="
                                            flex
                                            justify-between
                                            items-center
                                            border
                                            rounded-lg
                                            p-4
                                        "
                                    >

                                        <span
                                            className="
                                                font-medium
                                            "
                                        >
                                            Tema {tema.codigoTema}
                                        </span>

                                        <button
                                            onClick={() =>
                                                examenService
                                                    .descargarPdf(
                                                        tema.id
                                                    )
                                            }
                                            className="
                                                flex
                                                items-center
                                                gap-2
                                                px-4
                                                py-2
                                                rounded-lg
                                                bg-slate-800
                                                text-white
                                                hover:bg-slate-700
                                            "
                                        >

                                            <FileDown
                                                size={16}
                                            />

                                            Descargar PDF

                                        </button>

                                    </div>

                                )
                            )
                        }

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ExamenDetallePage;