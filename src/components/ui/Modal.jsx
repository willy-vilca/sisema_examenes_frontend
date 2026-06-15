function Modal({

    isOpen,

    title,

    children,

    onClose

}) {

    if (!isOpen) {

        return null;

    }

    return (

        <div
            className="
                fixed
                inset-0
                bg-black/50
                flex
                items-center
                justify-center
                z-50
                p-4
            "
        >

            <div
                className="
                    bg-white
                    rounded-xl
                    shadow-xl
                    w-full
                    max-w-4xl
                    max-h-[90vh]
                    overflow-auto
                "
            >

                <div
                    className="
                        flex
                        justify-between
                        items-center
                        border-b
                        px-6
                        py-4
                    "
                >

                    <h2
                        className="
                            text-xl
                            font-semibold
                        "
                    >
                        {title}
                    </h2>

                    <button
                        onClick={onClose}
                        className="
                            text-gray-500
                            hover:text-red-500
                        "
                    >
                        ✕
                    </button>

                </div>

                <div className="p-6">

                    {children}

                </div>

            </div>

        </div>

    );

}

export default Modal;