import axiosClient from "../api/axiosClient";

const authService = {

    login: (data) =>
        axiosClient.post("/auth/login", data),

    logout: () =>
        axiosClient.post("/auth/logout"),

    obtenerUsuario: () =>
        axiosClient.get("/auth/me")

};

export default authService;