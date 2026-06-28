import { useEffect, useState } from "react";

import {
    FaEdit,
    FaTrash,
    FaCopy,
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
    const [busquedaTexto, setBusquedaTexto] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const [paginaInput, setPaginaInput] = useState("1");

    const [mostrarModalReplicar,setMostrarModalReplicar] = useState(false);
    const [procesoDestino,setProcesoDestino] = useState("");
    const [replicando,setReplicando] = useState(false);

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

    const replicarPreguntas =
        async () => {

            if (!procesoDestino) {

                alertService.error(
                    "Proceso requerido",
                    "Seleccione un proceso destino."
                );

                return;

            }

            try {

                setReplicando(true);

                const payload = {

                    procesoDestinoId:
                        Number(procesoDestino),

                    preguntasIds:
                        preguntasFiltradas.map(
                            p => p.id
                        )

                };

                const response =
                    await preguntaService
                        .replicarPreguntas(
                            payload
                        );

                alertService.success(
                    "Proceso completado",
                    `Se copiaron correctamente  ${response.data.preguntasCopiadas} preguntas.\n\n` +
                    `Se omitieron ${response.data.preguntasOmitidas} preguntas porque ya pertenecían al proceso seleccionado.`
                );

                setMostrarModalReplicar(
                    false
                );

                setProcesoDestino("");

                cargarPreguntas();

            }
            catch (error) {

                alertService.error(
                    "Error",
                    "No fue posible replicar las preguntas."
                );

            }
            finally {

                setReplicando(false);

            }

        };

    const obtenerContenidoPlano =
    (texto) => {

        if (!texto) {

            return "";
        }

        return texto
            .replace(/<[^>]+>/g, " ")
            .replace(/&nbsp;/gi, " ")
            .replace(/\s+/g, " ")
            .trim();
    };

    const escaparRegExp =
    (texto) => {

        return texto.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );
    };

    const obtenerVistaPrevia =
    (
        texto,
        terminoBusqueda = ""
    ) => {

        const contenidoPlano =
            obtenerContenidoPlano(texto);

        if (!contenidoPlano) {

            return "";
        }

        const limite = 80;
        const terminoLimpio =
            terminoBusqueda.trim();

        if (!terminoLimpio) {

            return contenidoPlano.length > limite
                ? contenidoPlano.substring(
                    0,
                    limite
                  ) + "..."
                : contenidoPlano;
        }

        const indiceCoincidencia =
            contenidoPlano.toLowerCase().indexOf(
                terminoLimpio.toLowerCase()
            );

        if (indiceCoincidencia === -1) {

            return contenidoPlano.length > limite
                ? contenidoPlano.substring(
                    0,
                    limite
                  ) + "..."
                : contenidoPlano;
        }

        const inicio = Math.max(
            0,
            indiceCoincidencia - 25
        );

        const fin = Math.min(
            contenidoPlano.length,
            inicio + limite
        );

        let fragmento = contenidoPlano.substring(
            inicio,
            fin
        );

        if (inicio > 0) {
            fragmento = "..." + fragmento;
        }

        if (fin < contenidoPlano.length) {
            fragmento += "...";
        }

        return fragmento;
    };

    const renderVistaPreviaResaltada =
    (texto) => {

        const vistaPrevia = obtenerVistaPrevia(
            texto,
            busquedaTexto
        );

        if (!vistaPrevia) {

            return "Sin contenido";
        }

        const termino =
            busquedaTexto.trim();

        if (!termino) {

            return vistaPrevia;
        }

        const regex = new RegExp(
            `(${escaparRegExp(termino)})`,
            "ig"
        );

        return vistaPrevia
            .split(regex)
            .map((parte, index) => {

                const esCoincidencia =
                    parte.toLowerCase() ===
                    termino.toLowerCase();

                if (!esCoincidencia) {

                    return (
                        <span key={index}>
                            {parte}
                        </span>
                    );
                }

                return (
                    <mark
                        key={index}
                        className="bg-yellow-200 text-amber-900 px-0.5 rounded-sm"
                    >
                        {parte}
                    </mark>
                );
            });
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

        const contenidoLimpio = obtenerContenidoPlano(
            pregunta.contenidoHtml || ""
        ).toLowerCase();

        const coincideBusqueda =
            busquedaTexto.trim() === "" ||
            contenidoLimpio.includes(
                busquedaTexto.toLowerCase().trim()
            );

        return (
            coincideProceso &&
            coincideCategoriaPadre &&
            coincideCategoria &&
            coincideBusqueda
        );
    });

    useEffect(() => {
        setPaginaActual(1);
    }, [
        procesoFiltro,
        categoriaPadreFiltro,
        categoriaFiltro,
        busquedaTexto
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                                Buscar pregunta
                            </label>

                            <input
                                type="text"
                                value={busquedaTexto}
                                onChange={(e) =>
                                    setBusquedaTexto(e.target.value)
                                }
                                placeholder="Escriba una palabra clave..."
                                className="
                                    w-full
                                    border
                                    border-slate-300
                                    rounded-lg
                                    px-3
                                    py-2
                                "
                            />
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

            <div
                className="
                    flex
                    justify-between
                    items-center
                    mb-4
                "
            >

                <div
                    className="
                        text-sm
                        text-slate-600
                    "
                >

                    Se muestran
                    <span className="font-semibold">
                        {" "}{preguntasFiltradas.length}{" "}
                    </span>
                    preguntas.

                </div>

                <PrimaryButton
                    onClick={() =>
                        setMostrarModalReplicar(true)
                    }
                    disabled={
                        preguntasFiltradas.length === 0
                    }

                >
                    <div
                        className="
                            flex
                            items-center
                            gap-2
                        "
                    >
                        <FaCopy />
                        Agregar preguntas a otro proceso
                    </div>
                </PrimaryButton>
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
                                                        max-w-[360px]
                                                        text-left
                                                        text-sm
                                                        text-gray-700
                                                        leading-relaxed
                                                        line-clamp-2
                                                    "
                                                >

                                                    {
                                                        renderVistaPreviaResaltada(
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
                                                        label="Ver"
                                                        icon={<FaEye />}
                                                        color="green"
                                                        onClick={() =>
                                                            verPregunta(
                                                                pregunta
                                                            )
                                                        }
                                                    />

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
                isOpen={mostrarModalReplicar}
                title="Agregar preguntas a otro proceso"
                onClose={() => {
                    setMostrarModalReplicar(false);
                    setProcesoDestino("");
                }}
            >

                <div className="space-y-5">

                    <div
                        className="
                            bg-blue-50
                            border
                            border-blue-200
                            rounded-lg
                            p-4
                            text-sm
                            text-slate-700
                        "
                    >
                        Actualmente existen
                        <span className="font-semibold">
                            {" "}{preguntasFiltradas.length}{" "}
                        </span>
                        preguntas visibles en la tabla.
                        <br /><br />

                        Todas las preguntas que actualmente
                        se muestran en la tabla serán
                        replicadas y agregadas al proceso
                        seleccionado.

                        <br /><br />

                        Si alguna pregunta ya pertenece al proceso
                        seleccionado, será omitida automáticamente.

                    </div>

                    <div>

                        <label
                            className="
                                block
                                text-sm
                                font-medium
                                mb-2
                            "
                        >
                            Proceso destino
                        </label>

                        <select
                            value={procesoDestino}
                            onChange={(e) =>
                                setProcesoDestino(
                                    e.target.value
                                )
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
                                Seleccione un proceso
                            </option>

                            {
                                procesos.map(
                                    proceso => (
                                        <option
                                            key={proceso.id}
                                            value={proceso.id}
                                        >
                                            {proceso.nombre}
                                        </option>
                                    )
                                )
                            }

                        </select>

                    </div>

                    <div
                        className="
                            flex
                            justify-end
                            gap-3
                            pt-2
                        "
                    >

                        <button
                            onClick={() => {
                                setMostrarModalReplicar(
                                    false
                                );
                                setProcesoDestino("");

                            }}

                            className="
                                px-5
                                py-2
                                rounded-lg
                                border
                                border-slate-300
                                hover:bg-slate-100
                            "
                        >
                            Cancelar
                        </button>

                        <PrimaryButton
                            onClick={
                                replicarPreguntas
                            }
                            disabled={
                                !procesoDestino ||
                                replicando
                            }
                        >
                            {
                                replicando
                                ? "Replicando..."
                                : "Replicar preguntas"
                            }
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>

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