function PreguntasPorCategoriaCard({
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

            <div className="p-5 border-b">

                <h2
                    className="
                        font-semibold
                        text-slate-800
                    "
                >
                    Preguntas por Categoría
                </h2>

            </div>

            <div className="p-5">

                <div className="space-y-4">

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
                                        bg-slate-100
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