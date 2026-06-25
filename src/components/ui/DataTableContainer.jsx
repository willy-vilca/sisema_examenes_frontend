function DataTableContainer({
    children
}) {

    return (

        <div
            className="
                bg-white
                rounded-xl
                border
                border-slate-300
                shadow-lg
                overflow-hidden
            "
        >

            {children}

        </div>

    );

}

export default DataTableContainer;