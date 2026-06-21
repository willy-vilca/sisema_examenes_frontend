function UltimosExamenesCard({
    examenes
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
                    Últimos Exámenes Generados
                </h2>

            </div>

            <div className="p-5">

                <div className="space-y-4">

                    {
                        examenes.map((examen) => (

                            <div
                                key={examen.id}
                                className="
                                    border-b
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

                            </div>

                        ))
                    }

                </div>

            </div>

        </div>

    );

}

export default UltimosExamenesCard;