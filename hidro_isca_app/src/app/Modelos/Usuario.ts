export class Usuario {
  id: number;
  name: string;
  apellido: string;
  nif: string;
  direccion: string;
  poblacion: string;
  provincia: string;
  cuenta_bancaria: string;
  telefono: number;

  constructor(
    id: number, name: string, apellido: string, nif: string, direccion: string, poblacion: string, provincia: string, cuenta_bancaria: string, telefono: number) {
    this.id = id
    this.name = name;
    this.apellido = apellido;
    this.nif = nif;
    this.direccion = direccion;
    this.poblacion = poblacion;
    this.provincia = provincia;
    this.cuenta_bancaria = cuenta_bancaria;
    this.telefono = telefono;
  }
}
