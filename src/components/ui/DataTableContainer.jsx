function DataTableContainer({
    children
}) {

    return (

        <div
            className="
                bg-white
                rounded-xl
                border
                border-gray-200
                shadow-sm
                overflow-hidden
            "
        >

            {children}

        </div>

    );

}

export default DataTableContainer;