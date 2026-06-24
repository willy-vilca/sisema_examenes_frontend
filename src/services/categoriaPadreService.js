import axiosClient from "../api/axiosClient";

const categoriaPadreService = {

    listar: () => axiosClient.get("/categorias-padre"),

    obtenerPorId: (id) =>
        axiosClient.get(`/categorias-padre/${id}`),

    crear: (data) =>
        axiosClient.post("/categorias-padre", data),

    actualizar: (id, data) =>
        axiosClient.put(`/categorias-padre/${id}`, data),

    eliminar: (id) =>
        axiosClient.delete(`/categorias-padre/${id}`)

};

export default categoriaPadreService;