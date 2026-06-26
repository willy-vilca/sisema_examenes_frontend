function Badge({

    text,

    type = "success"

}) {

    const styles = {

        success:
            "bg-green-200 text-green-700",

        danger:
            "bg-red-200 text-red-700",

        warning:
            "bg-yellow-200 text-yellow-700",

        info:
            "bg-blue-200 text-blue-700"

    };

    return (

        <span

            className={`
                px-3
                py-1
                rounded-full
                text-xs
                font-medium
                ${styles[type]}
            `}

        >

            {text}

        </span>

    );

}

export default Badge;