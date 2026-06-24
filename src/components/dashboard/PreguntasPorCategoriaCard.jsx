function PreguntasPorCategoriaCard({
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

            <div className="p-5 border-b border-slate-300">

                <h2
                    className="
                        font-semibold
                        text-slate-800
                    "
                >
                    Preguntas por Categoría
                </h2>

            </div>

            <div
                className="
                    p-5
                    max-h-[420px]
                    overflow-y-auto
                "
            >

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
                        categorias.map((item) => (

                            <div
                                key={item.categoriaId}
                                className="
                                    flex
                                    justify-between
                                    items-center
                                "
                            >

                                <span>
                                    {item.categoriaNombre}
                                </span>

                                <span
                                    className="
                                        px-3 py-1
                                        rounded-full
                                        bg-slate-300
                                        text-slate-700
                                        text-sm
                                    "
                                >
                                    {item.cantidadPreguntas}
                                </span>

                            </div>

                        ))
                    }

                </div>

            </div>

        </div>

    );

}

export default PreguntasPorCategoriaCard;