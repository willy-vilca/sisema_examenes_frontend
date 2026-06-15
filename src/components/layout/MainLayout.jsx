import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

function MainLayout() {

    return (

        <div className="h-screen flex bg-gray-100">

            <Sidebar />

            <div className="flex-1 flex flex-col">

                <Header />

                <main className="flex-1 p-8 overflow-auto">

                    <Outlet />

                </main>

            </div>

        </div>

    );
}

export default MainLayout;