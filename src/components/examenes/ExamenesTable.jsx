import {
    Eye,
    Trash2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function ExamenesTable({
    examenes,
    onEliminar
}) {

    const navigate = useNavigate();

    return (

        <div
            className="
                bg-white
                rounded-xl
                shadow-lg
                border
                border-slate-300
                overflow-hidden
            "
        >

            <div className="p-6 border-b border-slate-300">

                <h2
                    className="
                        text-lg
                        font-semibold
                        text-slate-800
                    "
                >
                    Exámenes Generados
                </h2>

            </div>

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr
                            className="
                                bg-slate-100
                                text-slate-700
                                border-b
                                border-slate-300
                            "
                        >

                            <th className="p-4 text-left">
                                Nombre
                            </th>

                            <th className="p-4 text-left">
                                Proceso
                            </th>

                            <th className="p-4 text-left">
                                Usuario
                            </th>

                            <th className="p-4 text-left">
                                Fecha
                            </th>

                            <th className="p-4 text-center">
                                Acciones
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {examenes.length === 0 && (

                            <tr>

                                <td
                                    colSpan="5"
                                    className="
                                        p-8
                                        text-center
                                        text-slate-500
                                    "
                                >
                                    No existen exámenes generados.
                                </td>

                            </tr>

                        )}

                        {examenes.map((examen) => (

                            <tr
                                key={examen.id}
                                className="
                                    border-b
                                    border-slate-300
                                    hover:bg-slate-50
                                "
                            >

                                <td className="p-4">
                                    {examen.nombre}
                                </td>

                                <td className="p-4">
                                    <span
                                        className="
                                            inline-flex
                                            items-center
                                            px-3
                                            py-1
                                            rounded-full
                                            bg-slate-200
                                            text-slate-700
                                            text-sm
                                            font-medium
                                        "
                                    >
                                        {examen.procesoNombre}
                                    </span>
                                </td>

                                <td className="p-4">
                                    <span
                                        className="
                                            inline-flex
                                            px-3
                                            py-1
                                            rounded-full
                                            bg-blue-100
                                            text-blue-700
                                            text-sm
                                        "
                                    >
                                        {examen.usuarioNombre}
                                    </span>
                                </td>

                                <td className="p-4">

                                    {
                                        new Date(
                                            examen.fechaGeneracion
                                        ).toLocaleString()
                                    }

                                </td>

                                <td className="p-4">

                                    <div
                                        className="
                                            flex
                                            justify-center
                                            gap-2
                                        "
                                    >

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/examenes/${examen.id}`
                                                )
                                            }
                                            className="
                                                flex
                                                items-center
                                                gap-2
                                                px-3
                                                py-2
                                                rounded-lg
                                                bg-slate-800
                                                text-white
                                                hover:bg-slate-700
                                            "
                                        >
                                            <Eye size={16} />
                                            Ver Detalle
                                        </button>

                                        <button
                                            onClick={() =>
                                                onEliminar(examen.id)
                                            }
                                            className="
                                                flex
                                                items-center
                                                gap-2
                                                px-3
                                                py-2
                                                rounded-lg
                                                bg-red-600
                                                text-white
                                                hover:bg-red-700
                                            "
                                        >
                                            <Trash2 size={16} />
                                            Eliminar
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default ExamenesTable;