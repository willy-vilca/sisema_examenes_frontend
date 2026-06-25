import Card from "./Card";

function FormContainer({
    visible,
    title,
    children
}) {

    if (!visible) {
        return null;
    }

    return (
        <Card>
            {

                title && (

                    <div className="mb-6">

                        <h2
                            className="
                                text-xl
                                font-semibold
                                text-gray-800
                            "
                        >
                            {title}
                        </h2>

                        <div
                            className="
                                mt-2
                                border-b
                                border-slate-300
                            "
                        />

                    </div>

                )

            }

            {children}
        </Card>
    );
}

export default FormContainer;