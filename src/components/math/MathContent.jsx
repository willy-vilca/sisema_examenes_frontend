import {

    MathJax

} from "better-react-mathjax";

function MathContent({

    html

}) {

    return (

        <MathJax dynamic>

            <div className="
                        border
                        rounded-lg
                        p-4
                        border-slate-300
                        bg-gray-50
                    "

                dangerouslySetInnerHTML={{
                    __html: html
                }}

            />

        </MathJax>

    );

}

export default MathContent;