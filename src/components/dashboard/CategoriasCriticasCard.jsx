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
                border-slate-200
                shadow-sm
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
                                    className="
                                        px-3 py-1
                                        rounded-full
                                        bg-red-50
                                        text-red-700
                                        text-sm
                                    "
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