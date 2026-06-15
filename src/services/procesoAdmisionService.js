import axiosClient from "../api/axiosClient";

const procesoAdmisionService = {

    listar: () =>
        axiosClient.get("/procesos"),

    obtenerPorId: (id) =>
        axiosClient.get(`/procesos/${id}`),

    crear: (data) =>
        axiosClient.post("/procesos", data),

    actualizar: (id, data) =>
        axiosClient.put(`/procesos/${id}`, data),

    eliminar: (id) =>
        axiosClient.delete(`/procesos/${id}`)

};

export default procesoAdmisionService;