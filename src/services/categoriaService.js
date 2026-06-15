import axiosClient from "../api/axiosClient";

const categoriaService = {

    listar: () =>
        axiosClient.get("/categorias"),

    obtenerPorId: (id) =>
        axiosClient.get(`/categorias/${id}`),

    crear: (data) =>
        axiosClient.post("/categorias", data),

    actualizar: (id, data) =>
        axiosClient.put(`/categorias/${id}`, data),

    eliminar: (id) =>
        axiosClient.delete(`/categorias/${id}`)
};

export default categoriaService;