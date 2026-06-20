import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ExamenesTable({
    examenes
}) {

    const navigate = useNavigate();

    return (

        <div
            className="
                bg-white
                rounded-xl
                shadow-sm
                border
                border-slate-200
                overflow-hidden
            "
        >

            <div className="p-6 border-b">

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
                                    border-t
                                    hover:bg-slate-50
                                "
                            >

                                <td className="p-4">
                                    {examen.nombre}
                                </td>

                                <td className="p-4">
                                    {examen.procesoNombre}
                                </td>

                                <td className="p-4">
                                    {examen.usuarioNombre}
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