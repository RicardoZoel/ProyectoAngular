import { Injectable } from '@angular/core';
import { Usuario } from '../Modelos/Usuario';
import { BaseService } from '../Servicios/base.service';

import { timer } from 'rxjs';
import { take, timeoutWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsuariosControlador {
    
  constructor(
    private actividadService: BaseService){}
  getUsuarios(): any {
    console.log("data")
    return new Promise<Usuario[]>((resolve) => {
        this.actividadService
          .get('getUsuario')
          .pipe(timeoutWith(5000, timer(5000).pipe(take(1))))
          .subscribe(
            (data: any) => {
           
              console.log(data)
              if (data['error'] == undefined) {
                console.log(data)
                resolve(data);
              }
            },
            (error: any) => {
              
              console.log(error)
            }
          );
      });
  }
}