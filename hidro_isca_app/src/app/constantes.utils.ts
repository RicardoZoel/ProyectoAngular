import { Injectable } from "@angular/core";

export const IP_API: string = '192.168.1.214';
export const PORT_API: string = '8069';
export const ALL_API: string = 'http://' + IP_API + ':' + PORT_API + '/hidro_isca_app/';
export const IS_IN_SERVER: boolean = true;




@Injectable({
  providedIn: 'root'
})
export class IdEmpresa {
  constructor(){}
  getId(): string | null {
   return sessionStorage.getItem('empresa');
  }
  getIdUsuario(): string | null {
    return sessionStorage.getItem('usuario');
  }
}
