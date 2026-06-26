import { useEffect, useState } from "react";

import {
    FaEdit,
    FaTrash,
    FaPowerOff
} from "react-icons/fa";

import {
    FaEye
}
from "react-icons/fa";

import Modal from "../../components/ui/Modal";
import PreguntaPreview from "../../components/preguntas/PreguntaPreview";

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
import procesoAdmisionService from "../../services/procesoAdmisionService";
import categoriaPadreService from "../../services/categoriaPadreService";
import categoriaService from "../../services/categoriaService";

import alertService from "../../services/alertService";

import { confirmDialog }
from "../../services/confirmDialog";

const PreguntasPage = () => {
    const [preguntas, setPreguntas] = useState([]);
    const [procesos, setProcesos] = useState([]);
    const [categoriasPadre, setCategoriasPadre] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const [procesoFiltro, setProcesoFiltro] = useState("");
    const [categoriaPadreFiltro, setCategoriaPadreFiltro] = useState("");
    const [categoriaFiltro, setCategoriaFiltro] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const [paginaInput, setPaginaInput] = useState("1");
    const FILAS_POR_PAGINA = 6;

    const [loading, setLoading] =
        useState(true);

    const [mostrarFormulario,
        setMostrarFormulario] =
        useState(false);

    const [preguntaEditando,
        setPreguntaEditando] =
        useState(null);

    const [preguntaPreview,
    setPreguntaPreview] =
    useState(null);

    const [mostrarPreview,
        setMostrarPreview] =
        useState(false);

    useEffect(() => {

        cargarPreguntas();

    }, []);

    const cargarPreguntas = async () => {
        try {
            setLoading(true);

            const [
                preguntasResponse,
                procesosResponse,
                categoriasPadreResponse,
                categoriasResponse
            ] = await Promise.all([
                preguntaService.listar(),
                procesoAdmisionService.listar(),
                categoriaPadreService.listar(),
                categoriaService.listar()
            ]);

            setPreguntas(
                preguntasResponse.data
            );
            setProcesos(
                procesosResponse.data
            );
            setCategoriasPadre(
                categoriasPadreResponse.data
            );
            setCategorias(
                categoriasResponse.data
            );

        } catch (error) {
            alertService.error(
                "Error",
                "No se pudieron cargar los datos."
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

    const verPregunta =
    (pregunta) => {

        setPreguntaPreview(
            pregunta
        );

        setMostrarPreview(true);

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

    // Filtrado y Paginación de Preguntas
    const categoriasVisibles = categorias.filter((categoria) => {
        if (categoriaPadreFiltro === "") {
            return true;
        }
        return categoria.categoriaPadreId === Number(categoriaPadreFiltro);
    });

    const preguntasFiltradas = preguntas.filter((pregunta) => {
        const coincideProceso =
            procesoFiltro === "" ||
            pregunta.procesoId === Number(procesoFiltro);

        const coincideCategoriaPadre =
            categoriaPadreFiltro === "" ||
            pregunta.categoriaPadreId === Number(categoriaPadreFiltro);

        const coincideCategoria =
            categoriaFiltro === "" ||
            pregunta.categoriaId === Number(categoriaFiltro);

        return (
            coincideProceso &&
            coincideCategoriaPadre &&
            coincideCategoria
        );
    });

    useEffect(() => {
        setPaginaActual(1);
    }, [
        procesoFiltro,
        categoriaPadreFiltro,
        categoriaFiltro
    ]);

    useEffect(() => {
        setPaginaInput(
            paginaActual.toString()
        );
    }, [paginaActual]);

    const totalPaginas = Math.max(
        1,
        Math.ceil(
            preguntasFiltradas.length / FILAS_POR_PAGINA
        )
    );

    const indiceInicial = (paginaActual - 1) * FILAS_POR_PAGINA;

    const preguntasPagina =
        preguntasFiltradas.slice(
            indiceInicial,
            indiceInicial + FILAS_POR_PAGINA
        );


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
                <PageCard title="Filtros">
                    <div className="grid grid-cols-3 gap-6">
                        <div>
                            <label
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    mb-2
                                "
                            >
                                Proceso
                            </label>

                            <select
                                value={procesoFiltro}
                                onChange={(e) =>
                                    setProcesoFiltro(e.target.value)
                                }
                                className="
                                    w-full
                                    border
                                    border-slate-300
                                    rounded-lg
                                    px-3
                                    py-2
                                "
                            >

                                <option value="">
                                    Todos
                                </option>
                                {
                                    procesos.map((proceso) => (
                                        <option
                                            key={proceso.id}
                                            value={proceso.id}
                                        >
                                            {proceso.nombre}
                                        </option>
                                    ))
                                }
                            </select>

                        </div>

                        <div>

                            <label
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    mb-2
                                "
                            >
                                Categoría Padre
                            </label>

                            <select
                                value={categoriaPadreFiltro}
                                onChange={(e) => {

                                    setCategoriaPadreFiltro(e.target.value);

                                    setCategoriaFiltro("");

                                }}
                                className="
                                    w-full
                                    border
                                    border-slate-300
                                    rounded-lg
                                    px-3
                                    py-2
                                "
                            >

                                <option value="">
                                    Todas
                                </option>

                                {

                                    categoriasPadre.map((categoria) => (

                                        <option
                                            key={categoria.id}
                                            value={categoria.id}
                                        >
                                            {categoria.nombre}
                                        </option>

                                    ))

                                }

                            </select>

                        </div>

                        <div>

                            <label
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    mb-2
                                "
                            >
                                Subcategoría
                            </label>

                            <select
                                value={categoriaFiltro}
                                onChange={(e) =>
                                    setCategoriaFiltro(e.target.value)
                                }
                                className="
                                    w-full
                                    border
                                    border-slate-300
                                    rounded-lg
                                    px-3
                                    py-2
                                "
                            >

                                <option value="">
                                    Todas
                                </option>

                                {

                                    categoriasVisibles.map((categoria) => (

                                        <option
                                            key={categoria.id}
                                            value={categoria.id}
                                        >
                                            {categoria.nombre}
                                        </option>

                                    ))

                                }

                            </select>

                        </div>

                    </div>

                </PageCard>

            </div>

            <div className="mt-6 max-h-[600px] overflow-y-auto">
                <DataTableContainer>
                    {preguntasFiltradas.length === 0 ? (

                        <EmptyState
                            message="No existen preguntas registradas."
                        />

                    ) : (
                        <table className="w-full">
                            <thead
                                className="
                                    bg-neutral-200
                                    border-b
                                    border-slate-300
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
                                    SubCategoría
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

                                {preguntasPagina.map(
                                    (pregunta) => (

                                        <tr
                                        key={pregunta.id}
                                        className="
                                        border-b
                                        border-slate-300
                                        hover:bg-zinc-300
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
                                                    flex
                                                    gap-2
                                                    justify-center
                                                    "
                                                >

                                                    <ActionButton
                                                        label="Ver"
                                                        icon={<FaEye />}
                                                        color="green"
                                                        onClick={() =>
                                                            verPregunta(
                                                                pregunta
                                                            )
                                                        }
                                                    />
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

            <div
                className="
                    flex
                    justify-center
                    items-center
                    gap-4
                    mt-6
                "
            >

                <PrimaryButton
                    onClick={() => {
                        if (paginaActual > 1) {
                            setPaginaActual(
                                paginaActual - 1
                            );
                        }
                    }}
                    disabled={paginaActual <= 1}
                >
                    ← Anterior
                </PrimaryButton>

                <div
                    className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        font-medium
                    "
                >

                    Página

                    <input
                        type="number"
                        min="1"
                        max={totalPaginas}
                        value={paginaInput}
                        onChange={(e) =>
                            setPaginaInput(e.target.value)
                        }
                        onKeyDown={(e) => {

                            if (e.key !== "Enter") {
                                return;
                            }

                            let pagina = Number(paginaInput);

                            if (isNaN(pagina)) {
                                pagina = 1;
                            }

                            if (pagina < 1) {
                                pagina = 1;
                            }

                            if (pagina > totalPaginas) {
                                pagina = totalPaginas;
                            }

                            setPaginaInput(pagina.toString());
                            setPaginaActual(pagina);
                        }}
                        className="
                            w-16
                            text-center
                            border
                            border-slate-400
                            rounded-lg
                            py-1
                        "
                    />

                    de {totalPaginas}

                </div>

                <PrimaryButton
                    onClick={() => {
                        if (paginaActual < totalPaginas) {
                            setPaginaActual(
                                paginaActual + 1
                            );
                        }
                    }}
                    disabled={paginaActual >= totalPaginas}
                >
                    Siguiente →
                </PrimaryButton>

            </div>

            <Modal

                isOpen={
                    mostrarPreview
                }

                title="Vista Completa de la Pregunta"

                onClose={() =>
                    setMostrarPreview(false)
                }

            >

                <PreguntaPreview
                    pregunta={
                        preguntaPreview
                    }
                />

            </Modal>
        </>
    );
}

export default PreguntasPage;