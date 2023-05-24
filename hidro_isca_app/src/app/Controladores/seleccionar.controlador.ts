import { Injectable } from '@angular/core';
import { BaseService } from '../Servicios/base.service';
import { UsuariosControlador } from './UsuariosControlador';
import { ContadorControlador } from './ContadorControlador';

@Injectable({
  providedIn: 'root',
})
export class SeleccionarController {
  async seleccionarObjetoPorUsuario(texto: string, id: any): Promise<any[]> {
    if (texto == this.objetos[1]) {
      return await  this.contadorControlador.getContadoresPorUsuario(id);
    } else {
      return [];
    }
  }
  async seleccionarObjetoFiltradoPorUsuario(texto: string, filtro: string, id: any): Promise<any[]> {
    if (texto == this.objetos[1]) {
      return await  this.contadorControlador.getContadoresPorUsuario(id);
    } else {
      return [];
    }
  }
  objetos = [
    'usuarios',
    'contador',
  ];
  async seleccionarObjeto(texto: string) {

    if (texto == this.objetos[0]) {
      return await this.usucontrolador.getUsuarios();
    } else if (texto == this.objetos[1]) {
      return await  this.contadorControlador.getContadores();
    } else {
      return [];
    }
  }
  

  constructor(private usucontrolador: UsuariosControlador, private contadorControlador: ContadorControlador) {}

  async seleccionarObjetoFiltrado(texto: string, filtro: string) {
    if (texto == this.objetos[0]) {
      return await  this.usucontrolador.getUsuarios();
    } else if (texto == this.objetos[1]) {
      return await  this.contadorControlador.getContadores();
    } else {
      return [];
    }
  }
}
