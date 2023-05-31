import Swal from "sweetalert2";

export class swalCalls {
    static llamadaPagado() {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Ha sido pagado correctamente!',
            showConfirmButton: false,
            timer: 1500,
        });
    }
    static llamadaErrorBE_txt(arg0: any) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: arg0,
            showConfirmButton: false,
            timer: 1500,
        });
    }
    static llamadaErrorValidarCrear(txtError: string) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: txtError+' no esta definidos o mal, corrigalo antes de continuar!',
            showConfirmButton: false,
            timer: 1500,
        });
    }
    static llamadaErrorKeyDuplucado() {
        Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'No se ha podido crear ya que ya hay un Recibo con esos parametros!',
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