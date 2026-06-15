import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";

function DashboardPage() {

    return (

        <>

            <PageHeader
                title="Dashboard"
                subtitle="Panel principal del sistema"
            />

            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    lg:grid-cols-4
                    gap-6
                "
            >

                <Card>

                    <h3
                        className="
                            text-gray-500
                            text-sm
                        "
                    >
                        Categorías
                    </h3>

                    <p
                        className="
                            text-3xl
                            font-bold
                            mt-2
                        "
                    >
                        0
                    </p>

                </Card>

                <Card>

                    <h3
                        className="
                            text-gray-500
                            text-sm
                        "
                    >
                        Procesos
                    </h3>

                    <p
                        className="
                            text-3xl
                            font-bold
                            mt-2
                        "
                    >
                        0
                    </p>

                </Card>

                <Card>

                    <h3
                        className="
                            text-gray-500
                            text-sm
                        "
                    >
                        Preguntas
                    </h3>

                    <p
                        className="
                            text-3xl
                            font-bold
                            mt-2
                        "
                    >
                        0
                    </p>

                </Card>

                <Card>

                    <h3
                        className="
                            text-gray-500
                            text-sm
                        "
                    >
                        Exámenes
                    </h3>

                    <p
                        className="
                            text-3xl
                            font-bold
                            mt-2
                        "
                    >
                        0
                    </p>

                </Card>

            </div>

        </>

    );

}

export default DashboardPage;