import Swal from "sweetalert2";

export async function confirmDialog(
    title,
    message
) {

    const resultado =
        await Swal.fire({

            title,

            text: message,

            icon: "warning",

            showCancelButton: true,

            confirmButtonText:
                "Confirmar",

            cancelButtonText:
                "Cancelar"

        });

    return resultado.isConfirmed;

}