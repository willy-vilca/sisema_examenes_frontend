import {
    FileText,
    Layers3,
    GraduationCap
} from "lucide-react";

function ExamenesStats({
    examenes
}) {

    const totalExamenes =
        examenes.length;

    const totalTemas =
        examenes.reduce(
            (total, examen) =>
                total +
                (examen.cantidadTemas || 0),
            0
        );

    return (

        <div
            className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-6
            "
        >

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
                                text-slate-500
                                text-sm
                            "
                        >
                            Exámenes Generados
                        </p>

                        <h3
                            className="
                                text-3xl
                                font-bold
                                mt-2
                            "
                        >
                            {totalExamenes}
                        </h3>

                    </div>

                    <FileText
                        size={32}
                        className="text-slate-400"
                    />

                </div>

            </div>

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
                                text-slate-500
                                text-sm
                            "
                        >
                            Temas Generados
                        </p>

                        <h3
                            className="
                                text-3xl
                                font-bold
                                mt-2
                            "
                        >
                            {totalTemas}
                        </h3>

                    </div>

                    <Layers3
                        size={32}
                        className="text-slate-400"
                    />

                </div>

            </div>

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
                                text-slate-500
                                text-sm
                            "
                        >
                            Gestión Académica
                        </p>

                        <h3
                            className="
                                text-lg
                                font-semibold
                                mt-2
                            "
                        >
                            Sistema de Exámenes
                        </h3>

                    </div>

                    <GraduationCap
                        size={32}
                        className="text-slate-400"
                    />

                </div>

            </div>

        </div>

    );

}

export default ExamenesStats;