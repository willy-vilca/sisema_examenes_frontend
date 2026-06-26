import { useEffect, useState } from "react";
import TinyEditor from "../editor/TinyEditor";

import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";

import categoriaService
from "../../services/categoriaService";

import procesoAdmisionService
from "../../services/procesoAdmisionService";

function PreguntaForm({

    preguntaInicial,

    onGuardar,

    onCancelar

}) {

    const [procesos, setProcesos] =
        useState([]);

    const [categorias, setCategorias] =
        useState([]);

    const [procesoId, setProcesoId] =
        useState(
            preguntaInicial?.procesoId || ""
        );

    const [categoriaId, setCategoriaId] =
        useState(
            preguntaInicial?.categoriaId || ""
        );

    const [contenidoHtml,
        setContenidoHtml] =
        useState(
            preguntaInicial?.contenidoHtml || ""
        );

    const [alternativas,
        setAlternativas] =
        useState(
            preguntaInicial?.alternativas || [
                {
                    contenidoHtml: "",
                    esCorrecta: false
                },
                {
                    contenidoHtml: "",
                    esCorrecta: false
                },
                {
                    contenidoHtml: "",
                    esCorrecta: false
                },
                {
                    contenidoHtml: "",
                    esCorrecta: false
                },
                {
                    contenidoHtml: "",
                    esCorrecta: false
                }
            ]
        );

    useEffect(() => {

        cargarCatalogos();

    }, []);

    const cargarCatalogos =
        async () => {

            const procesosResponse =
                await procesoAdmisionService
                    .listar();

            const categoriasResponse =
                await categoriaService
                    .listar();

            setProcesos(
                procesosResponse.data
            );

            setCategorias(
                categoriasResponse.data
            );
        };

    const cambiarAlternativa =
        (
            index,
            campo,
            valor
        ) => {

            const copia =
                [...alternativas];

            copia[index][campo] =
                valor;

            setAlternativas(copia);
        };

    const seleccionarCorrecta =
        (index) => {

            const copia =
                alternativas.map(
                    (alt, i) => ({
                        ...alt,
                        esCorrecta:
                            i === index
                    })
                );

            setAlternativas(copia);
        };

    const handleSubmit =
        (e) => {

            e.preventDefault();

            onGuardar({

                procesoId:
                    Number(procesoId),

                categoriaId:
                    Number(categoriaId),

                contenidoHtml,

                alternativas

            });

        };

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >

            <div
                className="
                    grid
                    md:grid-cols-2
                    gap-4
                "
            >

                <div>

                    <label
                        className="
                            block
                            mb-1
                            font-medium
                        "
                    >
                        Proceso
                    </label>

                    <select
                        value={procesoId}
                        onChange={(e) =>
                            setProcesoId(
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
                        required
                    >

                        <option value="">
                            Seleccione
                        </option>

                        {
                            procesos.map(
                                proceso => (

                                    <option
                                        key={
                                            proceso.id
                                        }
                                        value={
                                            proceso.id
                                        }
                                    >
                                        {
                                            proceso.nombre
                                        }
                                    </option>

                                )
                            )
                        }

                    </select>

                </div>

                <div>

                    <label
                        className="
                            block
                            mb-1
                            font-medium
                        "
                    >
                        Categoría
                    </label>

                    <select
                        value={categoriaId}
                        onChange={(e) =>
                            setCategoriaId(
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
                        required
                    >

                        <option value="">
                            Seleccione
                        </option>

                        {
                            categorias.map(
                                categoria => (

                                    <option
                                        key={
                                            categoria.id
                                        }
                                        value={
                                            categoria.id
                                        }
                                    >
                                        {
                                            categoria.nombre
                                        }
                                    </option>

                                )
                            )
                        }

                    </select>

                </div>

            </div>

            <div
                className="
                    bg-blue-50
                    border
                    border-blue-300
                    rounded-lg
                    p-4
                    mb-4
                    text-sm
                "
            >

                <strong>
                    Fórmulas matemáticas:
                </strong>

                <br />

                Escriba expresiones usando:

                <br />

                <code>
                    {"\\(x^2 + y^2 = z^2\\)"}
                </code>

                <br />

                <code>
                    {"\\(\\frac{a}{b}\\)"}
                </code>

                <br />

                <code>
                    {"\\(\\sqrt{x}\\)"}
                </code>

            </div>

            <div>

                <label
                    className="
                        block
                        mb-1
                        font-medium
                    "
                >
                    Pregunta
                </label>

                <TinyEditor
                    value={contenidoHtml}
                    onChange={
                        setContenidoHtml
                    }
                    height={300}
                />

            </div>

            <div>

                <h3
                    className="
                        font-semibold
                        mb-3
                    "
                >
                    Alternativas
                </h3>

                {
                    alternativas.map(
                        (
                            alternativa,
                            index
                        ) => (

                            <div
                                key={index}
                                className="
                                    flex
                                    gap-3
                                    mb-3
                                    items-center
                                "
                            >

                                <input
                                    type="radio"
                                    checked={
                                        alternativa.esCorrecta
                                    }
                                    onChange={() =>
                                        seleccionarCorrecta(
                                            index
                                        )
                                    }
                                />

                                <TinyEditor

                                    value={
                                        alternativa.contenidoHtml
                                    }

                                    onChange={(valor) =>
                                        cambiarAlternativa(
                                            index,
                                            "contenidoHtml",
                                            valor
                                        )
                                    }

                                    height={180}

                                />

                            </div>

                        )
                    )
                }

            </div>

            <div
                className="
                    flex
                    justify-end
                    gap-3
                "
            >

                <SecondaryButton
                    onClick={onCancelar}
                >
                    Cancelar
                </SecondaryButton>

                <PrimaryButton
                    type="submit"
                >
                    Guardar Pregunta
                </PrimaryButton>

            </div>

        </form>

    );

}

export default PreguntaForm;