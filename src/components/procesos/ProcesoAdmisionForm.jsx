import { useState } from "react";

import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";

function ProcesoAdmisionForm({

    procesoInicial,

    onGuardar,

    onCancelar

}) {

    const [nombre, setNombre] =
        useState(
            procesoInicial?.nombre || ""
        );

    const [descripcion, setDescripcion] =
        useState(
            procesoInicial?.descripcion || ""
        );

    const [fechaInicio, setFechaInicio] =
        useState(
            procesoInicial?.fecha_inicio || ""
        );

    const [fechaFin, setFechaFin] =
        useState(
            procesoInicial?.fecha_fin || ""
        );

    const [estado, setEstado] =
        useState(
            procesoInicial?.estado || "ACTIVO"
        );

    const handleSubmit = (e) => {

        e.preventDefault();

        onGuardar({

            nombre,

            descripcion,

            fecha_inicio: fechaInicio,

            fecha_fin: fechaFin,

            estado

        });

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >

            <div>

                <label className="block mb-1 font-medium text-gray-700">
                    Nombre
                </label>

                <input
                    type="text"
                    value={nombre}
                    onChange={(e) =>
                        setNombre(e.target.value)
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2"
                    required
                />

            </div>

            <div>

                <label className="block mb-1 font-medium text-gray-700">
                    Descripción
                </label>

                <textarea
                    value={descripcion}
                    onChange={(e) =>
                        setDescripcion(e.target.value)
                    }
                    rows="3"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2"
                />

            </div>

            <div className="grid md:grid-cols-2 gap-4">

                <div>

                    <label className="block mb-1 font-medium text-gray-700">
                        Fecha Inicio
                    </label>

                    <input
                        type="date"
                        value={fechaInicio}
                        onChange={(e) =>
                            setFechaInicio(
                                e.target.value
                            )
                        }
                        className="w-full border border-slate-300 rounded-lg px-3 py-2"
                    />

                </div>

                <div>

                    <label className="block mb-1 font-medium text-gray-700">
                        Fecha Fin
                    </label>

                    <input
                        type="date"
                        value={fechaFin}
                        onChange={(e) =>
                            setFechaFin(
                                e.target.value
                            )
                        }
                        className="w-full border border-slate-300 rounded-lg px-3 py-2"
                    />

                </div>

            </div>

            <div>

                <label className="block mb-1 font-medium text-gray-700">
                    Estado
                </label>

                <select
                    value={estado}
                    onChange={(e) =>
                        setEstado(
                            e.target.value
                        )
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2"
                >

                    <option value="ACTIVO">
                        ACTIVO
                    </option>

                    <option value="INACTIVO">
                        INACTIVO
                    </option>

                </select>

            </div>

            <div className="flex justify-end gap-3">

                <SecondaryButton
                    onClick={onCancelar}
                >
                    Cancelar
                </SecondaryButton>

                <PrimaryButton type="submit">
                    Guardar
                </PrimaryButton>

            </div>

        </form>

    );

}

export default ProcesoAdmisionForm;