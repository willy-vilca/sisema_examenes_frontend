import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

function TinyEditor({

    value,

    onChange,

    height = 350

}) {

    const subirImagen =
        async (blobInfo) => {

            const formData =
                new FormData();

            formData.append(
                "file",
                blobInfo.blob(),
                blobInfo.filename()
            );

            const response =
                await axios.post(

                    "http://localhost:8080/api/uploads",

                    formData,

                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data"
                        }
                    }

                );

            return response.data.location;
        };

    return (

        <Editor

            apiKey={
                import.meta.env
                    .VITE_TINYMCE_API_KEY
            }

            value={value}

            onEditorChange={onChange}

            init={{

                height,

                menubar: true,

                branding: false,

                resize: true,

                automatic_uploads: true,

                images_upload_handler:
                    async (
                        blobInfo
                    ) => {

                        return await subirImagen(
                            blobInfo
                        );

                    },

                plugins: [

                    "anchor",

                    "autolink",

                    "charmap",

                    "code",

                    "image",

                    "link",

                    "lists",

                    "searchreplace",

                    "table",

                    "visualblocks",

                    "wordcount",

                    "paste"

                ],

                toolbar:

                    "undo redo | " +

                    "blocks fontsize | " +

                    "bold italic underline | " +

                    "alignleft aligncenter alignright alignjustify | " +

                    "bullist numlist outdent indent | " +

                    "link image table | " +

                    "searchreplace visualblocks code",

                content_style: `
                    body {
                        font-family: Arial, Helvetica, sans-serif;
                        font-size: 14px;
                    }
                `

            }}

        />

    );

}

export default TinyEditor;