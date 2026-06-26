function PageCard({

    title,

    children

}) {

    return (

        <div

            className="
                bg-white
                rounded-xl
                shadow-lg
                border
                border-slate-300
            "

        >

            <div

                className="
                    border-b
                    border-slate-300
                    px-6
                    py-4
                "

            >

                <h3

                    className="
                        text-lg
                        font-semibold
                        text-gray-800
                    "

                >
                    {title}
                </h3>

            </div>

            <div className="p-6">

                {children}

            </div>

        </div>

    );

}

export default PageCard;