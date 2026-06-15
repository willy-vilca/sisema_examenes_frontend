import { useEffect, useState } from "react";

import Swal from "sweetalert2";

import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import PrimaryButton from "../../components/ui/PrimaryButton";
import DataTableContainer from "../../components/ui/DataTableContainer";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import EmptyState from "../../components/ui/EmptyState";
import ActionButton from "../../components/ui/ActionButton";

import {
    FaEdit,
    FaTrash
} from "react-icons/fa";

import CategoriaForm from "../../components/categorias/CategoriaForm";
import categoriaService from "../../services/categoriaService";

function CategoriasPage() {

    const [categorias, setCategorias] = useState([]);

    const [mostrarFormulario, setMostrarFormulario] =
        useState(false);

    const [categoriaEditando, setCategoriaEditando] =
        useState(null);
    
    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        cargarCategorias();
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
                title="Categorías"
                subtitle="Administración de categorías del sistema"
                action={
                    <PrimaryButton
                        onClick={abrirNuevaCategoria}
                    >
                        Nueva Categoría
                    </PrimaryButton>
                }
            />

            {mostrarFormulario && (

                <Card>

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

                </Card>

            )}

            <div className="mt-6">

                <DataTableContainer>
                    {categorias.length === 0 ? (

                        <EmptyState
                            message="No existen categorías registradas."
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