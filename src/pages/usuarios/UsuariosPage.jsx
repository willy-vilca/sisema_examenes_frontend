import { useEffect, useState } from "react";

import Swal from "sweetalert2";

import {
    FaEdit,
    FaToggleOn,
    FaToggleOff
} from "react-icons/fa";

import PageHeader from "../../components/ui/PageHeader";
import PrimaryButton from "../../components/ui/PrimaryButton";
import DataTableContainer from "../../components/ui/DataTableContainer";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import EmptyState from "../../components/ui/EmptyState";
import ActionButton from "../../components/ui/ActionButton";
import Badge from "../../components/ui/Badge";
import FormContainer from "../../components/ui/FormContainer";

import UsuarioForm from "../../components/usuarios/UsuarioForm";

import usuarioService from "../../services/usuarioService";

function UsuariosPage() {

    const [usuarios, setUsuarios] = useState([]);

    const [loading, setLoading] = useState(true);

    const [mostrarFormulario, setMostrarFormulario] =
        useState(false);

    const [usuarioEditando, setUsuarioEditando] =
        useState(null);

    useEffect(() => {

        cargarUsuarios();

    }, []);

    const cargarUsuarios = async () => {

        try {

            setLoading(true);

            const response =
                await usuarioService.listar();

            setUsuarios(response.data);

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudieron cargar los usuarios."
            });

        } finally {

            setLoading(false);

        }

    };

    const abrirNuevoUsuario = () => {

        setUsuarioEditando(null);

        setMostrarFormulario(true);

    };

    const editarUsuario = (usuario) => {

        setUsuarioEditando(usuario);

        setMostrarFormulario(true);

    };

    const guardarUsuario = async (data) => {

        try {

            if (usuarioEditando) {

                await usuarioService.actualizar(
                    usuarioEditando.id,
                    data
                );

                Swal.fire({
                    icon: "success",
                    title: "Actualizado",
                    text: "Usuario actualizado correctamente."
                });

            } else {

                await usuarioService.crear(data);

                Swal.fire({
                    icon: "success",
                    title: "Guardado",
                    text: "Usuario creado correctamente."
                });

            }

            setMostrarFormulario(false);

            cargarUsuarios();

        } catch (error) {

            const mensaje =
                error?.response?.data?.message ||
                "Ocurrió un error.";

            Swal.fire({
                icon: "error",
                title: "Error",
                text: mensaje
            });

        }

    };

    const cambiarEstado = async (usuario) => {

        const resultado =
            await Swal.fire({

                title:
                    usuario.activo
                        ? "¿Desactivar usuario?"
                        : "¿Activar usuario?",

                text:
                    usuario.activo
                        ? "El usuario ya no podrá iniciar sesión."
                        : "El usuario podrá iniciar sesión nuevamente.",

                icon: "question",

                showCancelButton: true,

                confirmButtonText:
                    usuario.activo
                        ? "Desactivar"
                        : "Activar",

                cancelButtonText:
                    "Cancelar"

            });

        if (!resultado.isConfirmed) {

            return;

        }

        try {

            await usuarioService.cambiarEstado(
                usuario.id
            );

            Swal.fire({

                icon: "success",

                title: "Correcto",

                text:
                    "Estado actualizado correctamente."

            });

            cargarUsuarios();

        } catch (error) {

            const mensaje =
                error?.response?.data?.message ||
                "No se pudo actualizar el estado.";

            Swal.fire({

                icon: "error",

                title: "Error",

                text: mensaje

            });

        }

    };

    if (loading) {

        return (

            <>

                <PageHeader
                    title="Gestión de Usuarios"
                    subtitle="Administración de usuarios del sistema"
                />

                <LoadingSpinner />

            </>

        );

    }

    return (

        <>

            <PageHeader

                title="Gestión de Usuarios"

                subtitle="Administración de usuarios del sistema"

                action={

                    <PrimaryButton
                        onClick={abrirNuevoUsuario}
                    >
                        Nuevo Usuario
                    </PrimaryButton>

                }

            />

            <FormContainer

                visible={mostrarFormulario}

                title={
                    usuarioEditando
                        ? "Editar Usuario"
                        : "Nuevo Usuario"
                }

            >

                <UsuarioForm

                    usuarioInicial={usuarioEditando}

                    onGuardar={guardarUsuario}

                    onCancelar={() =>
                        setMostrarFormulario(false)
                    }

                />

            </FormContainer>

            <div className="mt-6">

                <DataTableContainer>

                    {

                        usuarios.length === 0

                            ?

                            (

                                <EmptyState
                                    message="No existen usuarios registrados."
                                />

                            )

                            :

                            (

                                <table className="w-full">

                                    <thead
                                        className="
                                            bg-gray-50
                                            border-b
                                            border-slate-300
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
                                                Correo
                                            </th>

                                            <th className="px-6 py-4 text-center">
                                                Rol
                                            </th>

                                            <th className="px-6 py-4 text-center">
                                                Estado
                                            </th>

                                            <th className="px-6 py-4 text-center">
                                                Acciones
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {

                                            usuarios.map(

                                                (usuario) => (

                                                    <tr

                                                        key={usuario.id}

                                                        className="
                                                            border-b
                                                            border-slate-300
                                                            hover:bg-gray-50
                                                        "

                                                    >

                                                        <td className="px-6 py-4">
                                                            {usuario.id}
                                                        </td>

                                                        <td className="px-6 py-4 font-medium">
                                                            {usuario.nombre}
                                                        </td>

                                                        <td className="px-6 py-4">
                                                            {usuario.correo}
                                                        </td>

                                                        <td className="px-6 py-4 text-center">

                                                            <Badge

                                                                text={
                                                                    usuario.rol === "ADMIN"
                                                                        ? "Administrador"
                                                                        : "Usuario"
                                                                }

                                                                type={
                                                                    usuario.rol === "ADMIN"
                                                                        ? "info"
                                                                        : "warning"
                                                                }

                                                            />

                                                        </td>

                                                        <td className="px-6 py-4 text-center">

                                                            <Badge

                                                                text={
                                                                    usuario.activo
                                                                        ? "Activo"
                                                                        : "Inactivo"
                                                                }

                                                                type={
                                                                    usuario.activo
                                                                        ? "success"
                                                                        : "danger"
                                                                }

                                                            />

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
                                                                        editarUsuario(usuario)
                                                                    }

                                                                />

                                                                <ActionButton

                                                                    label={
                                                                        usuario.activo
                                                                            ? "Desactivar"
                                                                            : "Activar"
                                                                    }

                                                                    icon={
                                                                        usuario.activo
                                                                            ? <FaToggleOff />
                                                                            : <FaToggleOn />
                                                                    }

                                                                    color={
                                                                        usuario.activo
                                                                            ? "red"
                                                                            : "green"
                                                                    }

                                                                    onClick={() =>
                                                                        cambiarEstado(usuario)
                                                                    }

                                                                />

                                                            </div>

                                                        </td>

                                                    </tr>

                                                )

                                            )

                                        }

                                    </tbody>

                                </table>

                            )

                    }

                </DataTableContainer>

            </div>

        </>

    );

}

export default UsuariosPage;