import { Component, Input } from '@angular/core';
import { UsuariosControlador } from 'src/app/Controladores/UsuariosControlador';
import { Usuario } from 'src/app/Modelos/Usuario';
import { swalCalls } from '../../Extras/swalCalls';
import { resolve } from 'dns';

@Component({
  selector: 'app-usuarios-lista',
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['./usuarios-lista.component.css']
})
export class UsuariosListaComponent {
  selected_usuario: Usuario = { id: 0 } as Usuario;
  usuarios: Usuario[] = [];
  cabezera: string = ""
  constructor(private usuControlador: UsuariosControlador) { }
  filter: string = ''; // var encargada de guardar el filtrado por carácteres
  //
  @Input() title = 'Usuario';
  ngOnInit(): void {
    this.loadUsuarios()
  }
  openOptionsForm(usu: Usuario) {
    this.selected_usuario = usu
    this.cabezera = usu.name + " " + usu.apellido
  }
  async loadUsuarios() {
    this.usuarios = await this.usuControlador.getUsuarios();
  }
  checkData() {
    var conta = 0
    var txtError = ""


    if (this.selected_usuario.name == undefined || this.selected_usuario.name == "") {
      txtError += "El nombre"
      conta += 1
    }
    if (this.selected_usuario.apellido == undefined || this.selected_usuario.apellido == "") {
      if (conta == 0) {
        txtError += "El apellido"
      } else {
        txtError += ", el apellido"
      }
      conta += 1
    }
    if (this.selected_usuario.direccion == undefined || this.selected_usuario.direccion == "") {
      if (conta == 0) {
        txtError += "La direccion"
      } else {
        txtError += ", la direccion"
      }
      conta += 1
    } if (this.selected_usuario.poblacion == undefined || this.selected_usuario.poblacion == "") {
      if (conta == 0) {
        txtError += "La poblacion"
      } else {
        txtError += ", la poblacion"
      }
      conta += 1
    } if (this.selected_usuario.provincia == undefined || this.selected_usuario.provincia == "") {
      if (conta == 0) {
        txtError += "La provincia"
      } else {
        txtError += ", la provincia"
      }
      conta += 1
    } if (this.selected_usuario.nif == undefined || this.selected_usuario.nif == "") {
      if (conta == 0) {
        txtError += "El nif"
      } else {
        txtError += ", el nif"
      }
      conta += 1
    } else {
      if (!this.isValidDni(this.selected_usuario.nif)) {
        swalCalls.llamadaErrorBE_txt("El nif no es correcto");
        return false
      }
    }
    if (this.selected_usuario.cuenta_bancaria != undefined) {

      const cuentaBancaria = this.selected_usuario.cuenta_bancaria.replace(/\s|-/g, '');

      if (cuentaBancaria.length !== 24) {
        swalCalls.llamadaErrorBE_txt('El número de cuenta bancaria debe tener 24 dígitos.')
        return false
      }

      if (!cuentaBancaria.startsWith('ES')) {
        swalCalls.llamadaErrorBE_txt('El número de cuenta bancaria debe comenzar con ES (para España).')
        return false
      }
    } else {
      if (conta == 0) {
        txtError += "La cuenta bancaria"
      } else {
        txtError += ", la cuenta bancaria"
      }
      conta += 1
    }
    if (this.selected_usuario.telefono == undefined || this.selected_usuario.telefono < 100000000) {
      if (conta == 0) {
        txtError += "El telefono"
      } else {
        txtError += ", el telefono"
      }
      conta += 1
    }
    if (conta == 0) {
      return true
    } else {

      swalCalls.llamadaErrorValidarCrear(txtError)
      return false
    }

  }
  async crearUsuario() {
    if (await this.checkData()) {
      if (this.selected_usuario.id == 0) {
        if (await this.usuControlador.postUsuario(this.selected_usuario)) {

          swalCalls.llamadaCreado()
        }
      } else {

        if (await this.usuControlador.putUsuario(this.selected_usuario)) {

          swalCalls.llamadaEditado()
        }
      }

      await this.loadUsuarios()
    }
  }
  limpiar_datos() {
    this.selected_usuario = { id: 0 } as Usuario;
    this.cabezera = ""

  }

  isValidDni(dni: string): boolean {
    dni = dni.toUpperCase();

    // Regular expressions for validation
    const dniRegex = /^\d{8}[A-Z]$/;
    const nifRegex = /^[XYZ]\d{7}[A-Z]$/;
    const nieRegex = /^[TJKLMNP]\d{8}[A-Z]$/;
    const cifRegex = /^[ABCDEFGHJNPQRSUVW]\d{7}[0-9A-J]$/;

    if (dniRegex.test(dni)) {
      const letter = dni.charAt(8);
      const number = dni.substr(0, 8);

      return letter === this.calculateDniLetter(number);
    }

    if (nifRegex.test(dni)) {
      const letter = dni.charAt(8);
      const number = dni.substr(1, 7);

      return letter === this.calculateDniLetter(number);
    }

    if (nieRegex.test(dni)) {
      const letter = dni.charAt(8);
      const number = dni.substr(1, 7);

      return letter === this.calculateNieLetter(number);
    }

    if (cifRegex.test(dni)) {
      const controlDigit = dni.charAt(8);
      const number = dni.substr(1, 7);

      return controlDigit === this.calculateCifControlDigit(number);
    }

    return false;
  }

  calculateDniLetter(number: string): string {
    const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const index = parseInt(number, 10) % 23;
    return letters.charAt(index);
  }

  calculateNieLetter(number: string): string {
    const letters = 'XYZ';
    const index = parseInt(number, 10) % 3;
    return letters.charAt(index);
  }

  calculateCifControlDigit(number: string): string {
    const evenSum = parseInt(number.charAt(1), 10) + parseInt(number.charAt(3), 10) + parseInt(number.charAt(5), 10);
    const oddSum = this.sumDigits((parseInt(number.charAt(0), 10) * 2).toString()) + this.sumDigits((parseInt(number.charAt(2), 10) * 2).toString()) + this.sumDigits((parseInt(number.charAt(4), 10) * 2).toString()) + this.sumDigits((parseInt(number.charAt(6), 10) * 2).toString());

    const sum = evenSum + oddSum;
    const controlDigit = (10 - (sum % 10)) % 10;

    return controlDigit.toString();
  }

  sumDigits(number: string): number {
    return number.split('').reduce((a, b) => a + parseInt(b, 10), 0);
  }

}
