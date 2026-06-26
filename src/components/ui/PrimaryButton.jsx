function PrimaryButton({
    children,
    onClick,
    type = "button",
    disabled = false
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                px-5
                py-2
                rounded-lg
                transition
                font-medium
                ${
                    disabled
                        ? "bg-slate-400 text-white cursor-not-allowed opacity-90"
                        : "bg-blue-700 hover:bg-blue-800 text-white"
                }
            `}
        >
            {children}
        </button>
    );
}

export default PrimaryButton;