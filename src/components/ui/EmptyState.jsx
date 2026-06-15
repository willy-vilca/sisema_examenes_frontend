function EmptyState({
    message
}) {

    return (

        <div
            className="
                text-center
                py-16
            "
        >

            <p
                className="
                    text-gray-500
                    text-lg
                "
            >
                {message}
            </p>

        </div>

    );

}

export default EmptyState;