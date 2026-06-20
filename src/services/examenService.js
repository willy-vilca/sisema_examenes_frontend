import api from "../api/axiosClient";

const examenService = {

    listar: async () => {
        const response = await api.get("/examenes");
        return response.data;
    },

    obtenerDetalle: async (id) => {
        const response = await api.get(`/examenes/${id}`);
        return response.data;
    },

    obtenerCategoriasDisponibles: async (procesoId) => {
        const response = await api.get(
            `/examenes/proceso/${procesoId}/categorias`
        );

        return response.data;
    },

    generarExamen: async (data) => {
        const response = await api.post(
            "/examenes/generar",
            data
        );

        return response.data;
    },

    descargarPdf: (temaId) => {
        window.open(
            `http://localhost:8080/api/examenes/tema/${temaId}/pdf`,
            "_blank"
        );
    }

};

export default examenService;