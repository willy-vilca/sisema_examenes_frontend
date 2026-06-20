import { useEffect, useState } from "react";

import Swal from "sweetalert2";

import ExamenForm from "../../components/examenes/ExamenForm";
import ModalConfiguracionExamen from "../../components/examenes/ModalConfiguracionExamen";
import ExamenesTable from "../../components/examenes/ExamenesTable";

import examenService from "../../services/examenService";

function ExamenesPage() {

    const [examenes, setExamenes] = useState([]);

    const [modalOpen, setModalOpen] =
        useState(false);

    const [formData, setFormData] =
        useState(null);

    useEffect(() => {

        cargarExamenes();

    }, []);

    const cargarExamenes = async () => {

        try {

            const data =
                await examenService.listar();

            setExamenes(data);

        } catch (error) {

            console.error(error);

        }

    };

    const abrirConfiguracion = (
        datosFormulario
    ) => {

        setFormData(
            datosFormulario
        );

        setModalOpen(true);

    };

    const generarExamen = async (
        configuracion
    ) => {

        try {

            const payload = {

                ...configuracion

            };

            await examenService
                .generarExamen(
                    payload
                );

            Swal.fire({
                icon: "success",
                title: "Examen generado",
                text: "Los temas y PDFs fueron generados correctamente."
            });

            setModalOpen(false);

            cargarExamenes();

        } catch (error) {

            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo generar el examen."
            });

        }

    };

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
                    Gestión de Exámenes
                </h1>

                <p
                    className="
                        text-slate-500
                        mt-1
                    "
                >
                    Administración y generación de exámenes de admisión.
                </p>

            </div>

            <ExamenForm
                onProcesar={
                    abrirConfiguracion
                }
            />

            <ExamenesTable
                examenes={examenes}
            />

            <ModalConfiguracionExamen
                open={modalOpen}
                onClose={() =>
                    setModalOpen(false)
                }
                procesoId={
                    formData?.procesoId
                }
                nombreExamen={
                    formData?.nombre
                }
                onGenerar={
                    generarExamen
                }
            />

        </div>

    );

}

export default ExamenesPage;