function Header() {

    return (

        <header
            className="
                bg-white
                border-b
                border-gray-200
                px-8
                py-4
                flex
                justify-between
                items-center
            "
        >

            <h2
                className="
                    text-xl
                    font-semibold
                    text-gray-800
                "
            >
                Sistema Generador de Exámenes
            </h2>

            <div
                className="
                    text-gray-600
                    font-medium
                "
            >
                Invitado
            </div>

        </header>

    );
}

export default Header;