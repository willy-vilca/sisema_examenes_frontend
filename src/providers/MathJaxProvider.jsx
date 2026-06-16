import {

    MathJaxContext

} from "better-react-mathjax";

function MathJaxProvider({

    children

}) {

    const config = {

        loader: {

            load: [
                "[tex]/html"
            ]

        },

        tex: {

            inlineMath: [

                ["\\(", "\\)"],

                ["$", "$"]

            ],

            displayMath: [

                ["\\[", "\\]"]

            ]

        }

    };

    return (

        <MathJaxContext
            config={config}
        >

            {children}

        </MathJaxContext>

    );

}

export default MathJaxProvider;