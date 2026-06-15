function ActionButton({
    icon,
    label,
    onClick,
    color = "blue"
}) {

    const colors = {
        blue:
            "bg-blue-100 text-blue-700 hover:bg-blue-200",

        red:
            "bg-red-100 text-red-700 hover:bg-red-200",
        green:
            "bg-green-100 text-green-700 hover:bg-green-200"
    };

    return (

        <button
            onClick={onClick}
            className={`
                inline-flex
                items-center
                gap-2
                px-3
                py-2
                rounded-lg
                transition
                text-sm
                font-medium
                ${colors[color]}
            `}
        >

            {icon}

            {label}

        </button>

    );

}

export default ActionButton;