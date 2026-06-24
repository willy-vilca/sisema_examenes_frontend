import { useEffect, useState } from "react";

import Swal from "sweetalert2";

import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import PrimaryButton from "../../components/ui/PrimaryButton";
import DataTableContainer from "../../components/ui/DataTableContainer";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import EmptyState from "../../components/ui/EmptyState";
import ActionButton from "../../components/ui/ActionButton";
import CategoriaPadreForm from "../../components/categorias/CategoriaPadreForm";
import categoriaPadreService from "../../services/categoriaPadreService";

import {
    FaEdit,
    FaTrash
} from "react-icons/fa";

import CategoriaForm from "../../components/categorias/CategoriaForm";
import categoriaService from "../../services/categoriaService";

function CategoriasPage() {

    const [categorias, setCategorias] = useState([]);
    const [vistaActiva, setVistaActiva] = useState("padre");
    const [categoriasPadre, setCategoriasPadre] = useState([]);
    const [categoriaPadreEditando, setCategoriaPadreEditando] = useState(null);

    const [mostrarFormulario, setMostrarFormulario] =
        useState(false);

    const [categoriaEditando, setCategoriaEditando] =
        useState(null);
    
    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        cargarCategorias();
        cargarCategoriasPadre();

    }, []);

    const cargarCategorias = async () => {

        try {

            setLoading(true);

            const response =
                await categoriaService.listar();

            setCategorias(response.data);

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudieron cargar las categorías"
            });

        } finally {

            setLoading(false);

        }

    };

    const cargarCategoriasPadre = async () => {

        try {

            const response =
                await categoriaPadreService.listar();

            setCategoriasPadre(response.data);

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudieron cargar las categorías padre"
            });

        }

    };

    const abrirNuevaCategoria = () => {

        setCategoriaEditando(null);

        setMostrarFormulario(true);

    };

    const editarCategoria = (categoria) => {

        setCategoriaEditando(categoria);

        setMostrarFormulario(true);

    };

    const guardarCategoria = async (data) => {

        try {

            if (categoriaEditando) {

                await categoriaService.actualizar(
                    categoriaEditando.id,
                    data
                );

                Swal.fire({
                    icon: "success",
                    title: "Actualizado",
                    text: "Categoría actualizada correctamente"
                });

            } else {

                await categoriaService.crear(data);

                Swal.fire({
                    icon: "success",
                    title: "Guardado",
                    text: "Categoría creada correctamente"
                });

            }

            setMostrarFormulario(false);

            cargarCategorias();

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

    const eliminarCategoria = async (id) => {

        const resultado =
            await Swal.fire({
                title: "¿Eliminar categoría?",
                text: "Esta acción no se puede deshacer",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar"
            });

        if (!resultado.isConfirmed) {
            return;
        }

        try {

            await categoriaService.eliminar(id);

            Swal.fire({
                icon: "success",
                title: "Eliminado",
                text: "Categoría eliminada correctamente"
            });

            cargarCategorias();

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo eliminar"
            });

        }

    };

    const abrirNuevaCategoriaPadre = () => {

        setCategoriaPadreEditando(null);

        setMostrarFormulario(true);

    };

    const editarCategoriaPadre = (categoria) => {

        setCategoriaPadreEditando(categoria);

        setMostrarFormulario(true);

    };

    const guardarCategoriaPadre = async (data) => {

        try {

            if (categoriaPadreEditando) {

                await categoriaPadreService.actualizar(
                    categoriaPadreEditando.id,
                    data
                );

                Swal.fire({
                    icon: "success",
                    title: "Actualizado",
                    text: "Categoría padre actualizada correctamente"
                });

            } else {

                await categoriaPadreService.crear(data);

                Swal.fire({
                    icon: "success",
                    title: "Guardado",
                    text: "Categoría padre creada correctamente"
                });

            }

            setMostrarFormulario(false);

            cargarCategoriasPadre();

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

    const eliminarCategoriaPadre = async (id) => {

        const resultado =
            await Swal.fire({
                title: "¿Eliminar categoría padre?",
                text: "Esta acción no se puede deshacer",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar"
            });

        if (!resultado.isConfirmed) {
            return;
        }

        try {

            await categoriaPadreService.eliminar(id);

            Swal.fire({
                icon: "success",
                title: "Eliminado",
                text: "Categoría padre eliminada correctamente"
            });

            cargarCategoriasPadre();

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo eliminar"
            });

        }

    };

    if (loading) {

        return (

            <>
                <PageHeader
                    title="Categorías"
                    subtitle="Administración de categorías del sistema"
                />

                <LoadingSpinner />
            </>

        );

    }

    return (

        <>

            <PageHeader
                title={
                    vistaActiva === "padre"
                        ? "Categorías"
                        : "Subcategorías"
                }
                subtitle={
                    vistaActiva === "padre"
                        ? "Administración de categorías principales"
                        : "Administración de subcategorías académicas"
                }
                action={
                    <PrimaryButton
                        onClick={
                            vistaActiva === "padre"
                                ? abrirNuevaCategoriaPadre
                                : abrirNuevaCategoria
                        }
                    >
                        {
                            vistaActiva === "padre"
                                ? "Nueva Categoría"
                                : "Nueva Subcategoría"
                        }
                    </PrimaryButton>
                }
            />

            <div
                className="
                    mb-6
                    bg-white
                    border
                    border-gray-200
                    rounded-xl
                    p-2
                    flex
                    gap-3
                    shadow-sm
                "
            >

                <button
                    onClick={() =>
                        setVistaActiva("padre")
                    }
                    className={`
                        px-5
                        py-3
                        rounded-lg
                        font-medium
                        transition-all
                        ${
                            vistaActiva === "padre"
                                ? "bg-blue-700 text-white shadow"
                                : "text-gray-700 border border-gray-400 hover:bg-gray-300"
                        }
                    `}
                >
                    Categorías
                </button>

                <button
                    onClick={() =>
                        setVistaActiva("subcategoria")
                    }
                    className={`
                        px-5
                        py-3
                        rounded-lg
                        font-medium
                        transition-all
                        ${
                            vistaActiva === "subcategoria"
                                ? "bg-blue-700 text-white shadow"
                                : "text-gray-700 border border-gray-400 hover:bg-gray-300"
                        }
                    `}
                >
                    Subcategorías
                </button>

            </div>

            {mostrarFormulario && (

                <Card>

                    {
                        vistaActiva === "padre"
                            ? (
                                <CategoriaPadreForm
                                    categoriaInicial={
                                        categoriaPadreEditando
                                    }
                                    onGuardar={
                                        guardarCategoriaPadre
                                    }
                                    onCancelar={() =>
                                        setMostrarFormulario(false)
                                    }
                                />
                            )
                            : (
                                <CategoriaForm
                                    categoriaInicial={
                                        categoriaEditando
                                    }
                                    onGuardar={
                                        guardarCategoria
                                    }
                                    onCancelar={() =>
                                        setMostrarFormulario(false)
                                    }
                                />
                            )
                    }

                </Card>

            )}

            <div className="mt-6">

                <DataTableContainer>
                    {vistaActiva === "padre" ? (

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

                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-left
                                        "
                                    >
                                        ID
                                    </th>

                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-left
                                        "
                                    >
                                        Nombre
                                    </th>

                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-left
                                        "
                                    >
                                        Descripción
                                    </th>

                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-center
                                        "
                                    >
                                        Acciones
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {categoriasPadre.map(
                                    (categoria) => (

                                        <tr
                                            key={categoria.id}
                                            className="
                                                border-b
                                                hover:bg-gray-50
                                            "
                                        >

                                            <td
                                                className="
                                                    px-6
                                                    py-4
                                                "
                                            >
                                                {categoria.id}
                                            </td>

                                            <td
                                                className="
                                                    px-6
                                                    py-4
                                                    font-medium
                                                "
                                            >
                                                {categoria.nombre}
                                            </td>

                                            <td
                                                className="
                                                    px-6
                                                    py-4
                                                "
                                            >
                                                {categoria.descripcion}
                                            </td>

                                            <td
                                                className="
                                                    px-6
                                                    py-4
                                                    text-center
                                                "
                                            >

                                                <div className="flex justify-center gap-2">
                                                    <ActionButton
                                                        label="Editar"
                                                        icon={<FaEdit />}
                                                        color="blue"
                                                        onClick={() =>
                                                            editarCategoriaPadre(categoria)
                                                        }
                                                    />

                                                    <ActionButton
                                                        label="Eliminar"
                                                        icon={<FaTrash />}
                                                        color="red"
                                                        onClick={() =>
                                                            eliminarCategoriaPadre(categoria.id)
                                                        }
                                                    />
                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>
                    ):(
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

                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-left
                                        "
                                    >
                                        ID
                                    </th>

                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-left
                                        "
                                    >
                                        Nombre
                                    </th>

                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-left
                                        "
                                    >
                                        Descripción
                                    </th>

                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-left
                                        "
                                    >
                                        Categoría
                                    </th>

                                    <th
                                        className="
                                            px-6
                                            py-4
                                            text-center
                                        "
                                    >
                                        Acciones
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {categorias.map(
                                    (categoria) => (

                                        <tr
                                            key={categoria.id}
                                            className="
                                                border-b
                                                hover:bg-gray-50
                                            "
                                        >

                                            <td
                                                className="
                                                    px-6
                                                    py-4
                                                "
                                            >
                                                {categoria.id}
                                            </td>

                                            <td
                                                className="
                                                    px-6
                                                    py-4
                                                    font-medium
                                                "
                                            >
                                                {categoria.nombre}
                                            </td>

                                            <td
                                                className="
                                                    px-6
                                                    py-4
                                                "
                                            >
                                                {categoria.descripcion}
                                            </td>

                                            <td
                                                className="
                                                    px-6
                                                    py-4
                                                "
                                            >

                                                {
                                                    categoria.categoriaPadreNombre
                                                        ? (
                                                            <span
                                                                className="
                                                                    inline-flex
                                                                    px-3
                                                                    py-1
                                                                    rounded-full
                                                                    bg-blue-100
                                                                    text-blue-700
                                                                    text-sm
                                                                    font-medium
                                                                "
                                                            >
                                                                {categoria.categoriaPadreNombre}
                                                            </span>
                                                        )
                                                        : (
                                                            <span
                                                                className="
                                                                    text-gray-400
                                                                "
                                                            >
                                                                Sin asignar
                                                            </span>
                                                        )
                                                }

                                            </td>

                                            <td
                                                className="
                                                    px-6
                                                    py-4
                                                    text-center
                                                "
                                            >

                                                <div className="flex justify-center gap-2">
                                                    <ActionButton
                                                        label="Editar"
                                                        icon={<FaEdit />}
                                                        color="blue"
                                                        onClick={() =>
                                                            editarCategoria(categoria)
                                                        }
                                                    />

                                                    <ActionButton
                                                        label="Eliminar"
                                                        icon={<FaTrash />}
                                                        color="red"
                                                        onClick={() =>
                                                            eliminarCategoria(categoria.id)
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

export default CategoriasPage;