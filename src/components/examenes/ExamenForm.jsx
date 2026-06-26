import { useEffect, useState } from "react";
import procesoService from "../../services/procesoAdmisionService";

function ExamenForm({
    onProcesar
}) {

    const [procesos, setProcesos] = useState([]);

    const [formData, setFormData] = useState({
        procesoId: "",
        nombre: ""
    });

    useEffect(() => {
        cargarProcesos();
    }, []);

    const cargarProcesos = async () => {
        try {

            const response =
                await procesoService.listar();

            setProcesos(response.data);

        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onProcesar(formData);

    };

    const limpiarFormulario = () => {

        setFormData({
            procesoId: "",
            nombre: ""
        });

    };

    return (

        <div className="bg-white rounded-xl shadow-lg border border-slate-300 p-6">

            <h2 className="text-lg font-semibold text-slate-800 mb-6">
                Crear Nuevo Examen
            </h2>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >

                <select
                    name="procesoId"
                    value={formData.procesoId}
                    onChange={handleChange}
                    className="border border-slate-300 rounded-lg px-4 py-2"
                    required
                >

                    <option value="">
                        Seleccione un proceso
                    </option>

                    {procesos.map((proceso) => (

                        <option
                            key={proceso.id}
                            value={proceso.id}
                        >
                            {proceso.nombre}
                        </option>

                    ))}

                </select>

                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Nombre del examen"
                    className="border border-slate-300 rounded-lg px-4 py-2"
                    required
                />

                <div className="flex gap-2">

                    <button
                        type="button"
                        onClick={limpiarFormulario}
                        className="px-4 py-2 rounded-lg transition-all border border-slate-400 text-slate-800 hover:bg-gray-300"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="
                            px-4 py-2
                            rounded-lg
                            bg-slate-800
                            text-white
                            transition-all
                            hover:bg-slate-700
                        "
                    >
                        Procesar Examen
                    </button>

                </div>

            </form>

        </div>

    );

}

export default ExamenForm;