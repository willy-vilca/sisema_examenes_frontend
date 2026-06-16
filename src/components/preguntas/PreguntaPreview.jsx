import Badge from "../ui/Badge";
import MathContent from "../math/MathContent";

function PreguntaPreview({

    pregunta

}) {

    if (!pregunta) {

        return null;

    }

    return (

        <div className="space-y-6">

            <div>

                <h3
                    className="
                        font-semibold
                        mb-2
                    "
                >
                    Enunciado
                </h3>

                <MathContent
                    html={
                        pregunta.contenidoHtml
                    }
                />

            </div>

            <div>

                <h3
                    className="
                        font-semibold
                        mb-4
                    "
                >
                    Alternativas
                </h3>

                <div className="space-y-4">

                    {
                        pregunta.alternativas?.map(
                            (
                                alternativa,
                                index
                            ) => (

                                <div
                                    key={alternativa.id}
                                    className="
                                        border
                                        rounded-lg
                                        p-4
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            justify-between
                                            items-start
                                            mb-3
                                        "
                                    >

                                        <strong>
                                            {
                                                String.fromCharCode(
                                                    65 + index
                                                )
                                            }
                                        </strong>

                                        {
                                            alternativa.esCorrecta && (

                                                <Badge
                                                    text="CORRECTA"
                                                    type="success"
                                                />

                                            )
                                        }

                                    </div>

                                    <MathContent
                                        html={
                                            alternativa.contenidoHtml
                                        }
                                    />

                                </div>

                            )
                        )
                    }

                </div>

            </div>

        </div>

    );

}

export default PreguntaPreview;