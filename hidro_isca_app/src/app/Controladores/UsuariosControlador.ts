import { Injectable } from '@angular/core';
import { Usuario } from '../Modelos/Usuario';
import { BaseService } from '../Servicios/base.service';

import { timer } from 'rxjs';
import { take, timeoutWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsuariosControlador {
  getUsuario(arg0: any) {
    return new Promise<Usuario>((resolve) => {
      this.baseService
        .get('getUsuario/'+arg0)
        .pipe(timeoutWith(5000, timer(5000).pipe(take(1))))
        .subscribe(
          (data: any) => {
         
            if (data['error'] == undefined) {
              console.log(data['data'])
              resolve(data['data']);
            }
          },
          (error: any) => {
            
            console.log(error)
          }
        );
    });

  }
  putUsuario(selected_usuario: Usuario) {
    return new Promise<boolean>((resolve) => {
      this.baseService
        .put('putUsuario/'+selected_usuario.id,selected_usuario)
        .pipe(timeoutWith(5000, timer(5000).pipe(take(1))))
        .subscribe(
          (data: any) => {
         
            if (data['error'] == undefined) {
              console.log(data)
              console.log(data['data'])
              resolve(true);
            }
          },
          (error: any) => {
            
            console.log(error)
          }
        );
    });
  }
  postUsuario(usuario:Usuario) {
    return new Promise<boolean>((resolve) => {
        this.baseService
          .post('postUsuario',usuario)
          .pipe(timeoutWith(5000, timer(5000).pipe(take(1))))
          .subscribe(
            (data: any) => {
           
              if (data['error'] == undefined) {
                console.log(data)
                console.log(data['data'])
                resolve(true);
              }
            },
            (error: any) => {
              
              console.log(error)
            }
          );
      });
  }
    
  constructor(private baseService: BaseService){}
  
  getUsuarios(): any {
    console.log("data")
    return new Promise<Usuario[]>((resolve) => {
        this.baseService
          .get('getUsuario')
          .pipe(timeoutWith(5000, timer(5000).pipe(take(1))))
          .subscribe(
            (data: any) => {
           
              if (data['error'] == undefined) {
                console.log(data['data'])
                resolve(data['data']);
              }
            },
            (error: any) => {
              
              console.log(error)
            }
          );
      });
  }
}