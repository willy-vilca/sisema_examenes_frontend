import { Editor } from "@tinymce/tinymce-react";

function TinyEditor({

    value,

    onChange,

    height = 300

}) {

    return (

        <Editor

            value={value}

            onEditorChange={onChange}

            init={{

                height,

                menubar: true,

                branding: false,

                plugins: [

                    "lists",

                    "link",

                    "image",

                    "table",

                    "code",

                    "paste"

                ],

                toolbar:

                    "undo redo | " +

                    "bold italic underline | " +

                    "alignleft aligncenter alignright | " +

                    "bullist numlist | " +

                    "table image link | " +

                    "code"

            }}

        />

    );

}

export default TinyEditor;