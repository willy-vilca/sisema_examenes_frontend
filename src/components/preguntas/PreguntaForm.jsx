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

            {/* ── Sección 1: Clasificación ── */}
            <div className="rounded-xl border border-slate-200 overflow-hidden">

                <div className="flex items-center gap-3 px-5 py-3.5 bg-slate-50 border-b border-slate-200">
                    <span className="w-6 h-6 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                        1
                    </span>
                    <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                        Clasificación
                    </h3>
                </div>

                <div className="p-5 grid md:grid-cols-2 gap-4">

                    <div>
                        <label className="block mb-1.5 text-sm font-medium text-gray-700">
                            Proceso de admisión
                        </label>
                        <select
                            value={procesoId}
                            onChange={(e) =>
                                setProcesoId(e.target.value)
                            }
                            className="
                                w-full
                                border
                                border-slate-300
                                rounded-lg
                                px-3
                                py-2
                                text-sm
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
                                focus:border-transparent
                                bg-white
                            "
                            required
                        >
                            <option value="">— Seleccione un proceso —</option>
                            {procesos.map(proceso => (
                                <option key={proceso.id} value={proceso.id}>
                                    {proceso.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1.5 text-sm font-medium text-gray-700">
                            Subcategoría
                        </label>
                        <select
                            value={categoriaId}
                            onChange={(e) =>
                                setCategoriaId(e.target.value)
                            }
                            className="
                                w-full
                                border
                                border-slate-300
                                rounded-lg
                                px-3
                                py-2
                                text-sm
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
                                focus:border-transparent
                                bg-white
                            "
                            required
                        >
                            <option value="">— Seleccione una categoría —</option>
                            {categorias.map(categoria => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>

            </div>

            {/* ── Sección 2: Enunciado ── */}
            <div className="rounded-xl border border-slate-200 overflow-hidden">

                <div className="flex items-center gap-3 px-5 py-3.5 bg-slate-50 border-b border-slate-200">
                    <span className="w-6 h-6 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                        2
                    </span>
                    <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                        Enunciado de la pregunta
                    </h3>
                </div>

                <div className="p-5 space-y-4">

                    <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-blue-800">
                        <span className="mt-0.5 text-blue-400 flex-shrink-0">&#9432;</span>
                        <span>
                            Para fórmulas matemáticas use notación LaTeX entre{" "}
                            <code className="bg-blue-100 px-1 rounded text-xs">{"\\( \\)"}</code>
                            {" "}— por ejemplo:{" "}
                            <code className="bg-blue-100 px-1 rounded text-xs">{"\\(x^2 + y^2 = z^2\\)"}</code>
                            ,{" "}
                            <code className="bg-blue-100 px-1 rounded text-xs">{"\\(\\frac{a}{b}\\)"}</code>
                            ,{" "}
                            <code className="bg-blue-100 px-1 rounded text-xs">{"\\(\\sqrt{x}\\)"}</code>
                        </span>
                    </div>

                    <TinyEditor
                        value={contenidoHtml}
                        onChange={setContenidoHtml}
                        height={300}
                    />

                </div>

            </div>

            {/* ── Sección 3: Alternativas ── */}
            <div className="rounded-xl border border-slate-200 overflow-hidden">

                <div className="flex items-center gap-3 px-5 py-3.5 bg-slate-50 border-b border-slate-200">
                    <span className="w-6 h-6 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                        3
                    </span>
                    <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                        Alternativas de respuesta
                    </h3>
                </div>

                <div className="p-5 space-y-4">

                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800">
                        <span className="mt-0.5 text-amber-500 flex-shrink-0">&#9432;</span>
                        <span>
                            Ingrese el contenido de cada alternativa y{" "}
                            <strong>marque el círculo verde</strong>{" "}
                            de la alternativa que sea la <strong>respuesta correcta</strong>.
                        </span>
                    </div>

                    <div className="space-y-3">

                        {
                            alternativas.map(
                                (alternativa, index) => {

                                    const letras = ["A", "B", "C", "D", "E"];
                                    const esCorrecta = alternativa.esCorrecta;

                                    return (

                                        <div
                                            key={index}
                                            className={`
                                                rounded-xl
                                                border-2
                                                transition-all
                                                duration-200
                                                overflow-hidden
                                                ${
                                                    esCorrecta
                                                        ? "border-green-400 shadow-md shadow-green-100"
                                                        : "border-slate-200 hover:border-slate-300"
                                                }
                                            `}
                                        >

                                            <div
                                                className={`
                                                    flex
                                                    items-center
                                                    gap-3
                                                    px-4
                                                    py-2.5
                                                    ${
                                                        esCorrecta
                                                            ? "bg-green-50"
                                                            : "bg-slate-50"
                                                    }
                                                `}
                                            >

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        seleccionarCorrecta(index)
                                                    }
                                                    className={`
                                                        w-7
                                                        h-7
                                                        rounded-full
                                                        border-2
                                                        flex-shrink-0
                                                        flex
                                                        items-center
                                                        justify-center
                                                        transition-all
                                                        duration-200
                                                        focus:outline-none
                                                        focus:ring-2
                                                        focus:ring-green-400
                                                        focus:ring-offset-1
                                                        ${
                                                            esCorrecta
                                                                ? "border-green-500 bg-green-500"
                                                                : "border-slate-300 bg-white hover:border-green-400"
                                                        }
                                                    `}
                                                    title="Marcar como respuesta correcta"
                                                >
                                                    {esCorrecta && (
                                                        <svg
                                                            className="w-4 h-4 text-white"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            strokeWidth={3}
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M5 13l4 4L19 7"
                                                            />
                                                        </svg>
                                                    )}
                                                </button>

                                                <span
                                                    className={`
                                                        font-bold
                                                        text-sm
                                                        w-6
                                                        ${
                                                            esCorrecta
                                                                ? "text-green-700"
                                                                : "text-slate-500"
                                                        }
                                                    `}
                                                >
                                                    {letras[index]}
                                                </span>

                                                <span
                                                    className={`
                                                        text-xs
                                                        font-medium
                                                        ${
                                                            esCorrecta
                                                                ? "text-green-600"
                                                                : "text-slate-400"
                                                        }
                                                    `}
                                                >
                                                    {esCorrecta
                                                        ? "✓ Respuesta correcta"
                                                        : "Marcar como correcta"
                                                    }
                                                </span>

                                            </div>

                                            <div className="p-3 bg-white">

                                                <TinyEditor
                                                    value={alternativa.contenidoHtml}
                                                    onChange={(valor) =>
                                                        cambiarAlternativa(
                                                            index,
                                                            "contenidoHtml",
                                                            valor
                                                        )
                                                    }
                                                    height={160}
                                                    minimal={true}
                                                />

                                            </div>

                                        </div>

                                    );

                                }
                            )
                        }

                    </div>

                </div>

            </div>

            {/* ── Acciones ── */}
            <div className="flex justify-end gap-3 pt-2">

                <SecondaryButton onClick={onCancelar}>
                    Cancelar
                </SecondaryButton>

                <PrimaryButton type="submit">
                    Guardar Pregunta
                </PrimaryButton>

            </div>

        </form>

    );

}

export default PreguntaForm;