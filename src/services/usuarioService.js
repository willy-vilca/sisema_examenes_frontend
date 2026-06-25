import axiosClient from "../api/axiosClient";

const usuarioService = {

    listar: () =>
        axiosClient.get("/usuarios"),

    obtenerPorId: (id) =>
        axiosClient.get(`/usuarios/${id}`),

    crear: (data) =>
        axiosClient.post("/usuarios", data),

    actualizar: (id, data) =>
        axiosClient.put(`/usuarios/${id}`, data),

    cambiarEstado: (id) =>
        axiosClient.patch(`/usuarios/${id}/estado`)

};

export default usuarioService;