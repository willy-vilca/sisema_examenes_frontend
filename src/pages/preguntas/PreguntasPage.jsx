import { useEffect, useState } from "react";

import {
    FaEdit,
    FaTrash,
    FaPowerOff
} from "react-icons/fa";

import PageHeader from "../../components/ui/PageHeader";
import PrimaryButton from "../../components/ui/PrimaryButton";
import DataTableContainer from "../../components/ui/DataTableContainer";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import EmptyState from "../../components/ui/EmptyState";
import ActionButton from "../../components/ui/ActionButton";
import Badge from "../../components/ui/Badge";
import PageCard from "../../components/ui/PageCard";

import PreguntaForm from "../../components/preguntas/PreguntaForm";

import preguntaService from "../../services/preguntaService";

import alertService from "../../services/alertService";

import { confirmDialog }
from "../../services/confirmDialog";

const PreguntasPage = () => {
    const [preguntas, setPreguntas] =
    useState([]);

    const [loading, setLoading] =
        useState(true);

    const [mostrarFormulario,
        setMostrarFormulario] =
        useState(false);

    const [preguntaEditando,
        setPreguntaEditando] =
        useState(null);

    useEffect(() => {

        cargarPreguntas();

    }, []);

    const cargarPreguntas =
    async () => {

        try {

            setLoading(true);

            const response =
                await preguntaService.listar();

            setPreguntas(
                response.data
            );

        } catch (error) {

            alertService.error(
                "Error",
                "No se pudieron cargar las preguntas"
            );

        } finally {

            setLoading(false);

        }

    };

    const abrirNuevaPregunta =
    () => {

        setPreguntaEditando(null);

        setMostrarFormulario(true);

    };

    const editarPregunta =
    (pregunta) => {

        setPreguntaEditando(
            pregunta
        );

        setMostrarFormulario(true);

    };

    const guardarPregunta =
    async (data) => {

        try {

            if (
                preguntaEditando
            ) {

                await preguntaService
                    .actualizar(
                        preguntaEditando.id,
                        data
                    );

                alertService.success(
                    "Actualizado",
                    "Pregunta actualizada correctamente"
                );

            } else {

                await preguntaService
                    .crear(data);

                alertService.success(
                    "Guardado",
                    "Pregunta creada correctamente"
                );

            }

            setMostrarFormulario(
                false
            );

            cargarPreguntas();

        } catch (error) {

            const mensaje =
                error?.response?.data?.message ||
                "Ocurrió un error";

            alertService.error(
                "Error",
                mensaje
            );

        }

    };

    const eliminarPregunta =
    async (id) => {

        const confirmado =
            await confirmDialog(
                "¿Eliminar pregunta?",
                "Esta acción no se puede deshacer"
            );

        if (!confirmado) {

            return;

        }

        try {

            await preguntaService
                .eliminar(id);

            alertService.success(
                "Eliminado",
                "Pregunta eliminada correctamente"
            );

            cargarPreguntas();

        } catch (error) {

            alertService.error(
                "Error",
                "No se pudo eliminar"
            );

        }

    };

    const cambiarEstado =
    async (id) => {

        try {

            await preguntaService
                .cambiarEstado(id);

            cargarPreguntas();

        } catch (error) {

            alertService.error(
                "Error",
                "No se pudo cambiar el estado"
            );

        }

    };

    const obtenerVistaPrevia =
    (texto) => {

        if (!texto) {

            return "";
        }

        return texto.length > 80
            ? texto.substring(
                0,
                80
              ) + "..."
            : texto;
    };

    if (loading) {

        return (

            <>
                <PageHeader
                    title="Banco de Preguntas"
                    subtitle="Administración del banco de preguntas"
                />

                <LoadingSpinner />
            </>

        );

    }

    return (
        <>
            <PageHeader
                title="Banco de Preguntas"
                subtitle="Administración del banco de preguntas"
                action={
                    <PrimaryButton
                        onClick={
                            abrirNuevaPregunta
                        }
                    >
                        Nueva Pregunta
                    </PrimaryButton>
                }
            />

            {mostrarFormulario && (

                <PageCard
                    title={
                        preguntaEditando
                            ? "Editar Pregunta"
                            : "Nueva Pregunta"
                    }
                >

                    <PreguntaForm
                        preguntaInicial={
                            preguntaEditando
                        }
                        onGuardar={
                            guardarPregunta
                        }
                        onCancelar={() =>
                            setMostrarFormulario(false)
                        }
                    />

                </PageCard>

            )}

            <div className="mt-6">
                <DataTableContainer>
                    {preguntas.length === 0 ? (

                        <EmptyState
                            message="No existen preguntas registradas."
                        />

                    ) : (
                        <table className="w-full">
                            <thead
                                className="
                                    bg-gray-50
                                    border-b
                                "
                            >

                                <tr>

                                    <th className="px-6 py-4">
                                    ID
                                    </th>

                                    <th className="px-6 py-4">
                                    Proceso
                                    </th>

                                    <th className="px-6 py-4">
                                    Categoría
                                    </th>

                                    <th className="px-6 py-4">
                                    Estado
                                    </th>

                                    <th className="px-6 py-4">
                                    Vista Previa
                                    </th>

                                    <th className="px-6 py-4">
                                    Acciones
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {preguntas.map(
                                    (pregunta) => (

                                        <tr
                                        key={pregunta.id}
                                        className="
                                        border-b
                                        hover:bg-gray-50
                                        "
                                        >

                                            <td className="px-6 py-4">
                                                {pregunta.id}
                                            </td>

                                            <td className="px-6 py-4">
                                                {pregunta.procesoNombre}
                                            </td>

                                            <td className="px-6 py-4">
                                                {pregunta.categoriaNombre}
                                            </td>

                                            <td className="px-6 py-4">

                                                <Badge
                                                    text={
                                                        pregunta.activo
                                                        ? "ACTIVA"
                                                        : "INACTIVA"
                                                    }
                                                    type={
                                                        pregunta.activo
                                                        ? "success"
                                                        : "danger"
                                                    }
                                                />

                                            </td>

                                            <td className="px-6 py-4">

                                                <div
                                                    className="
                                                    max-w-sm
                                                    truncate
                                                    "
                                                >

                                                {
                                                    obtenerVistaPrevia(
                                                        pregunta.contenidoHtml
                                                    )
                                                }
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">

                                                <div
                                                    className="
                                                    flex
                                                    gap-2
                                                    justify-center
                                                    "
                                                >

                                                    <ActionButton
                                                        label="Editar"
                                                        icon={<FaEdit />}
                                                        color="blue"
                                                        onClick={() =>
                                                            editarPregunta(
                                                                pregunta
                                                            )
                                                        }
                                                    />

                                                    <ActionButton
                                                        label={
                                                            pregunta.activo
                                                            ? "Desactivar"
                                                            : "Activar"
                                                        }
                                                        icon={<FaPowerOff />}
                                                        color="blue"
                                                        onClick={() =>
                                                            cambiarEstado(
                                                                pregunta.id
                                                            )
                                                        }
                                                    />

                                                    <ActionButton
                                                        label="Eliminar"
                                                        icon={<FaTrash />}
                                                        color="red"
                                                        onClick={() =>
                                                            eliminarPregunta(
                                                                pregunta.id
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

export default PreguntasPage;