function SecondaryButton({
    children,
    onClick
}) {

    return (

        <button
            onClick={onClick}
            className="
                bg-gray-300
                hover:bg-gray-400
                text-gray-700
                px-5
                py-2
                rounded-lg
                transition
                font-medium
            "
        >
            {children}
        </button>

    );

}

export default SecondaryButton;