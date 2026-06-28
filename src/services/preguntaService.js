import axiosClient from "../api/axiosClient";

const preguntaService = {

    listar: () =>
        axiosClient.get("/preguntas"),

    obtenerPorId: (id) =>
        axiosClient.get(`/preguntas/${id}`),

    crear: (data) =>
        axiosClient.post("/preguntas", data),

    actualizar: (id, data) =>
        axiosClient.put(`/preguntas/${id}`, data),

    eliminar: (id) =>
        axiosClient.delete(`/preguntas/${id}`),

    cambiarEstado: (id) =>
        axiosClient.patch(
            `/preguntas/${id}/estado`
        ),

    replicarPreguntas: (data) =>
        axiosClient.post(
            "/preguntas/replicar",
            data
        ),
};

export default preguntaService;