import Swal from "sweetalert2";

const alertService = {

    success(title, message) {

        return Swal.fire({

            icon: "success",

            title,

            text: message

        });

    },

    error(title, message) {

        return Swal.fire({

            icon: "error",

            title,

            text: message

        });

    },

    warning(title, message) {

        return Swal.fire({

            icon: "warning",

            title,

            text: message

        });

    }

};

export default alertService;