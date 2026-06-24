import {
    FolderTree,
    GraduationCap,
    FileQuestion,
    FileText
} from "lucide-react";

function DashboardStats({
    resumen
}) {

    const cards = [
        {
            titulo: "Categorías",
            valor: resumen.totalCategorias,
            icono: <FolderTree size={28}/>
        },
        {
            titulo: "Procesos",
            valor: resumen.totalProcesos,
            icono: <GraduationCap size={28}/>
        },
        {
            titulo: "Preguntas",
            valor: resumen.totalPreguntas,
            icono: <FileQuestion size={28}/>
        },
        {
            titulo: "Exámenes",
            valor: resumen.totalExamenes,
            icono: <FileText size={28}/>
        }
    ];

    return (

        <div
            className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-4
                gap-6
            "
        >

            {
                cards.map((card) => (

                    <div
                        key={card.titulo}
                        className="
                            bg-white
                            rounded-2xl
                            border
                            border-slate-300
                            shadow-med
                            hover:shadow-xl
                            transition-all
                            duration-300
                            p-6
                        "
                    >

                        <div
                            className="
                                flex
                                justify-between
                                items-center
                            "
                        >

                            <div>

                                <p
                                    className="
                                        text-sm
                                        text-slate-500
                                    "
                                >
                                    {card.titulo}
                                </p>

                                <h3
                                    className="
                                        text-4xl
                                        font-bold
                                        mt-2
                                        text-slate-800
                                    "
                                >
                                    {card.valor}
                                </h3>

                            </div>

                            <div
                                className="
                                    text-slate-400
                                "
                            >
                                {card.icono}
                            </div>

                        </div>

                    </div>

                ))
            }

        </div>

    );

}

export default DashboardStats;