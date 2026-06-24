import { useEffect, useState } from "react";
import dashboardService from "../../services/dashboardService";
import DashboardStats from "../../components/dashboard/DashboardStats";
import PreguntasPorCategoriaCard from "../../components/dashboard/PreguntasPorCategoriaCard";
import UltimosExamenesCard from "../../components/dashboard/UltimosExamenesCard";
import CategoriasCriticasCard from "../../components/dashboard/CategoriasCriticasCard";

function DashboardPage() {

    const [resumen, setResumen] =
        useState(null);

    useEffect(() => {

        cargarDashboard();

    }, []);

    const cargarDashboard = async () => {

        try {
            const data =
                await dashboardService
                    .obtenerResumen();

            setResumen(data);

        }
        catch (error) {
            console.error(error);
        }

    };

    if (!resumen) {
        return (
            <div>
                Cargando Dashboard...
            </div>
        );
    }

    return (

        <div className="space-y-6">

           <div
                    className="
                        bg-gradient-to-r
                        from-slate-800
                        to-slate-700
                        text-white
                        rounded-2xl
                        p-8
                    "
            >

                    <h2
                        className="
                            text-2xl
                            font-semibold
                        "
                    >
                        Bienvenido al Sistema Generador de Exámenes
                    </h2>

                    <p
                        className="
                            mt-2
                            text-slate-200
                        "
                    >
                        Administre categorías, preguntas,
                        procesos de admisión y genere exámenes
                        oficiales en formato PDF.
                    </p>

            </div>
            
            <div
                className="
                    bg-white
                    border
                    border-slate-300
                    rounded-2xl
                    shadow-sm
                    p-8
                "
            >

                <div
                    className="
                        flex
                        flex-col
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                    "
                >

                    <div>

                        <h1
                            className="
                                text-3xl
                                font-bold
                                text-slate-800
                            "
                        >
                            Dashboard
                        </h1>

                        <p
                            className="
                                mt-2
                                text-slate-500
                            "
                        >
                            Panel general del Sistema Generador de Exámenes de Admisión.
                        </p>

                    </div>

                    <div
                        className="
                            mt-4
                            lg:mt-0
                            px-4
                            py-2
                            rounded-xl
                            bg-slate-100
                            text-slate-700
                            font-medium
                        "
                    >
                        Gestión Académica
                    </div>

                </div>

            </div>

            <DashboardStats
                resumen={resumen}
            />

            <div
                className="
                    grid
                    grid-cols-1
                    xl:grid-cols-2
                    gap-6
                "
            >

                <PreguntasPorCategoriaCard
                    categorias={
                        resumen.preguntasPorCategoria
                    }
                />

                <UltimosExamenesCard
                    examenes={
                        resumen.ultimosExamenes
                    }
                />

            </div>

            <CategoriasCriticasCard
                categorias={
                    resumen.categoriasCriticas
                }
            />

        </div>

    );

}

export default DashboardPage;