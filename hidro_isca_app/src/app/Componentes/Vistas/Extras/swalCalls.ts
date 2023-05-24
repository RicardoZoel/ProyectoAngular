import Swal from "sweetalert2";

export class swalCalls {
    static llamadaErrorKeyDuplucado() {
        Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'No se ha podido crear ya que ya hay un recivo con esos parametros!',
        showConfirmButton: false,
        timer: 1500,
    });
    }

    static llamadaCreado(){
        Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Ha sido creado correctamente!',
        showConfirmButton: false,
        timer: 1500,
    });}
    static llamadaEditado(){
        Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Ha sido editado correctamente!',
        showConfirmButton: false,
        timer: 1500,
    });}

}