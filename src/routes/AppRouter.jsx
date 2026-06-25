import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import AdminRoute from "../components/auth/AdminRoute";
import PublicRoute from "../components/auth/PublicRoute";
import LoginPage from "../pages/auth/LoginPage";
import UsuariosPage from "../pages/usuarios/UsuariosPage";

import DashboardPage from "../pages/dashboard/DashboardPage";
import CategoriasPage from "../pages/categorias/CategoriasPage";
import ProcesosPage from "../pages/procesos/ProcesosPage";
import PreguntasPage from "../pages/preguntas/PreguntasPage";
import ExamenesPage from "../pages/examenes/ExamenesPage";
import ExamenDetallePage from "../pages/examenes/ExamenDetallePage";

function AppRouter() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
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

                    <Route
                        path="examenes/:id"
                        element={<ExamenDetallePage />}
                    />

                    <Route
                        path="usuarios"
                        element={
                            <AdminRoute>
                                <UsuariosPage />
                            </AdminRoute>
                        }
                    />


                </Route>

            </Routes>

        </BrowserRouter>

    );
}

export default AppRouter;