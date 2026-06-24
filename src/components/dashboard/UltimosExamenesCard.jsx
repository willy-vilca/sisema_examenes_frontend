function UltimosExamenesCard({
    examenes
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
                    Últimos Exámenes Generados
                </h2>

            </div>

            <div className="p-5">

                <div className="space-y-4">
                    {
                        examenes.length === 0 && (
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
                        examenes.map((examen) => (

                            <div
                                key={examen.id}
                                className="
                                    border-b
                                    border-slate-300
                                    pb-3
                                "
                            >

                                <p
                                    className="
                                        font-medium
                                        text-slate-800
                                    "
                                >
                                    {examen.nombre}
                                </p>

                                <p
                                    className="
                                        text-sm
                                        text-slate-500
                                    "
                                >
                                    {examen.procesoNombre}
                                </p>

                                <p
                                    className="
                                        text-xs
                                        text-slate-400
                                        mt-1
                                    "
                                >
                                    {
                                        new Date(
                                            examen.fechaGeneracion
                                        ).toLocaleDateString()
                                    }
                                </p>

                            </div>

                        ))
                    }

                </div>

            </div>

        </div>

    );

}

export default UltimosExamenesCard;