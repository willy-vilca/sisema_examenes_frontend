import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import DashboardPage from "../pages/dashboard/DashboardPage";
import CategoriasPage from "../pages/categorias/CategoriasPage";
import ProcesosPage from "../pages/procesos/ProcesosPage";
import PreguntasPage from "../pages/preguntas/PreguntasPage";
import ExamenesPage from "../pages/examenes/ExamenesPage";

function AppRouter() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<MainLayout />}
                >

                    <Route
                        index
                        element={<DashboardPage />}
                    />

                    <Route
                        path="categorias"
                        element={<CategoriasPage />}
                    />

                    <Route
                        path="procesos"
                        element={<ProcesosPage />}
                    />

                    <Route
                        path="preguntas"
                        element={<PreguntasPage />}
                    />

                    <Route
                        path="examenes"
                        element={<ExamenesPage />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>

    );
}

export default AppRouter;