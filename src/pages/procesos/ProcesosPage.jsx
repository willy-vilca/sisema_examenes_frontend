import { useEffect, useState } from "react";

import Swal from "sweetalert2";

import {
    FaEdit,
    FaTrash
} from "react-icons/fa";

import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import PrimaryButton from "../../components/ui/PrimaryButton";
import DataTableContainer from "../../components/ui/DataTableContainer";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import EmptyState from "../../components/ui/EmptyState";
import ActionButton from "../../components/ui/ActionButton";

import ProcesoAdmisionForm from "../../components/procesos/ProcesoAdmisionForm";

import procesoAdmisionService from "../../services/procesoAdmisionService";

function ProcesosPage() {

    const [procesos, setProcesos] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [mostrarFormulario,
        setMostrarFormulario] =
        useState(false);

    const [procesoEditando,
        setProcesoEditando] =
        useState(null);

    useEffect(() => {

        cargarProcesos();

    }, []);

    const cargarProcesos = async () => {

        try {

            setLoading(true);

            const response =
                await procesoAdmisionService.listar();

            setProcesos(response.data);

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Error",
                text:
                    "No se pudieron cargar los procesos"
            });

        } finally {

            setLoading(false);

        }

    };

    const abrirNuevoProceso = () => {

        setProcesoEditando(null);

        setMostrarFormulario(true);

    };

    const editarProceso = (proceso) => {

        setProcesoEditando(proceso);

        setMostrarFormulario(true);

    };

    const guardarProceso = async (data) => {

        try {

            if (procesoEditando) {

                await procesoAdmisionService.actualizar(
                    procesoEditando.id,
                    data
                );

                Swal.fire({
                    icon: "success",
                    title: "Actualizado",
                    text:
                        "Proceso actualizado correctamente"
                });

            } else {

                await procesoAdmisionService.crear(
                    data
                );

                Swal.fire({
                    icon: "success",
                    title: "Guardado",
                    text:
                        "Proceso creado correctamente"
                });

            }

            setMostrarFormulario(false);

            cargarProcesos();

        } catch (error) {

            const mensaje =
                error?.response?.data?.message ||
                "Ocurrió un error";

            Swal.fire({
                icon: "error",
                title: "Error",
                text: mensaje
            });

        }

    };

    const eliminarProceso = async (id) => {

        const resultado =
            await Swal.fire({

                title:
                    "¿Eliminar proceso?",

                text:
                    "Esta acción no se puede deshacer",

                icon: "warning",

                showCancelButton: true,

                confirmButtonText:
                    "Sí, eliminar",

                cancelButtonText:
                    "Cancelar"

            });

        if (!resultado.isConfirmed) {

            return;

        }

        try {

            await procesoAdmisionService.eliminar(
                id
            );

            Swal.fire({

                icon: "success",

                title: "Eliminado",

                text:
                    "Proceso eliminado correctamente"

            });

            cargarProcesos();

        } catch (error) {

            Swal.fire({

                icon: "error",

                title: "Error",

                text:
                    "No se pudo eliminar"

            });

        }

    };

    if (loading) {

        return (

            <>

                <PageHeader
                    title="Procesos de Admisión"
                    subtitle="Administración de procesos"
                />

                <LoadingSpinner />

            </>

        );

    }

    return (

        <>

            <PageHeader

                title="Procesos de Admisión"

                subtitle="Administración de procesos de admisión"

                action={

                    <PrimaryButton
                        onClick={
                            abrirNuevoProceso
                        }
                    >
                        Nuevo Proceso
                    </PrimaryButton>

                }

            />

            {mostrarFormulario && (

                <Card>

                    <ProcesoAdmisionForm

                        procesoInicial={
                            procesoEditando
                        }

                        onGuardar={
                            guardarProceso
                        }

                        onCancelar={() =>
                            setMostrarFormulario(false)
                        }

                    />

                </Card>

            )}

            <div className="mt-6">

                <DataTableContainer>

                    {procesos.length === 0 ? (

                        <EmptyState
                            message="No existen procesos registrados."
                        />

                    ) : (

                        <table
                            className="w-full"
                        >

                            <thead
                                className="
                                    bg-gray-50
                                    border-b
                                "
                            >

                                <tr>

                                    <th className="px-6 py-4 text-left">
                                        ID
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Nombre
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Estado
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Fecha Inicio
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Fecha Fin
                                    </th>

                                    <th className="px-6 py-4 text-center">
                                        Acciones
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {procesos.map(
                                    (proceso) => (

                                        <tr

                                            key={
                                                proceso.id
                                            }

                                            className="
                                                border-b
                                                hover:bg-gray-50
                                            "

                                        >

                                            <td className="px-6 py-4">
                                                {proceso.id}
                                            </td>

                                            <td className="px-6 py-4 font-medium">
                                                {proceso.nombre}
                                            </td>

                                            <td className="px-6 py-4">

                                                <span
                                                    className={
                                                        proceso.estado === "ACTIVO"
                                                            ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium"
                                                            : "bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium"
                                                    }
                                                >
                                                    {proceso.estado}
                                                </span>

                                            </td>

                                            <td className="px-6 py-4">
                                                {proceso.fecha_inicio}
                                            </td>

                                            <td className="px-6 py-4">
                                                {proceso.fecha_fin}
                                            </td>

                                            <td className="px-6 py-4">

                                                <div
                                                    className="
                                                        flex
                                                        justify-center
                                                        gap-2
                                                    "
                                                >

                                                    <ActionButton
                                                        label="Editar"
                                                        icon={<FaEdit />}
                                                        color="blue"
                                                        onClick={() =>
                                                            editarProceso(
                                                                proceso
                                                            )
                                                        }
                                                    />

                                                    <ActionButton
                                                        label="Eliminar"
                                                        icon={<FaTrash />}
                                                        color="red"
                                                        onClick={() =>
                                                            eliminarProceso(
                                                                proceso.id
                                                            )
                                                        }
                                                    />

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    )}

                </DataTableContainer>

            </div>

        </>

    );

}

export default ProcesosPage;