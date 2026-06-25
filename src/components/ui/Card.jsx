function Card({ children }) {

    return (

        <div
            className="
                bg-white
                rounded-xl
                shadow-lg
                border
                border-slate-300
                p-6
            "
        >

            {children}

        </div>

    );

}

export default Card;