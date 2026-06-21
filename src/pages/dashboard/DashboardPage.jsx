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
                        text-slate-500
                        mt-1
                    "
                >
                    Sistema Generador de Exámenes de Admisión
                </p>

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