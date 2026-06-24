import { AlertTriangle } from "lucide-react";

function CategoriasCriticasCard({
    categorias
}) {

    return (

        <div
            className="
                bg-white
                rounded-xl
                border
                border-slate-300
                shadow-lg
            "
        >

            <div
                className="
                    p-5
                    border-b
                    border-slate-300
                    flex
                    items-center
                    gap-2
                "
            >

                <AlertTriangle
                    size={18}
                    className="text-amber-500"
                />

                <h2
                    className="
                        font-semibold
                        text-slate-800
                    "
                >
                    Categorías Críticas
                </h2>

            </div>

            <div className="p-5">

                <div className="space-y-4">

                    {
                        categorias.length === 0 && (
                            <div
                                className="
                                    text-center
                                    py-8
                                    text-slate-500
                                "
                            >
                                No existen registros disponibles.
                            </div>
                        )
                    }

                    {
                        categorias.map((cat) => (

                            <div
                                key={cat.categoriaId}
                                className="
                                    flex
                                    justify-between
                                    items-center
                                "
                            >

                                <span>
                                    {cat.categoriaNombre}
                                </span>

                                <span
                                    className={`
                                        px-3 py-1
                                        rounded-full
                                        text-sm
                                        font-medium
                                        ${
                                            cat.cantidadPreguntas === 0
                                                ? "bg-red-100 text-red-700"
                                                : cat.cantidadPreguntas <= 10
                                                ? "bg-amber-100 text-amber-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }
                                    `}
                                >
                                    {cat.cantidadPreguntas}
                                </span>

                            </div>

                        ))
                    }

                </div>

            </div>

        </div>

    );

}

export default CategoriasCriticasCard;