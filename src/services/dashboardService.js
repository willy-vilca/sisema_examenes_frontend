import api from "../api/axiosClient";

const dashboardService = {

    obtenerResumen: async () => {

        const response =
            await api.get(
                "/dashboard/resumen"
            );

        return response.data;

    }

};

export default dashboardService;