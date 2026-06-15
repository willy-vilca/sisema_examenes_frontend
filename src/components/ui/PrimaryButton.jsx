function PrimaryButton({
    children,
    onClick,
    type = "button"
}) {

    return (

        <button
            type={type}
            onClick={onClick}
            className="
                bg-blue-700
                hover:bg-blue-800
                text-white
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

export default PrimaryButton;