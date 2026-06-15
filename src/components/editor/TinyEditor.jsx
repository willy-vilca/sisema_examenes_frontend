import { Editor } from "@tinymce/tinymce-react";

function TinyEditor({

    value,

    onChange,

    height = 350

}) {

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