import { Injectable } from '@angular/core';
import { BaseService } from '../Servicios/base.service';

import { timer } from 'rxjs';
import { take, timeoutWith } from 'rxjs/operators';
import { Empresa } from '../Modelos/Emresa';
import { Agua } from '../Modelos/Agua';
import { Contador } from '../Modelos/Contador';

@Injectable({
  providedIn: 'root',
})
export class ContadorControlador {
  getContadoresPorUsuario( id: any): any[] | PromiseLike<any[]> {
    return new Promise<Contador[]>((resolve) => {
      this.baseService
        .get('getContadoresPorUsuario/'+id)
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
    constructor(private baseService: BaseService){}
  getContadores(): any {
    return new Promise<Contador[]>((resolve) => {
        this.baseService
          .get('getContadores')
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
  getContador(arg0: any): any {
    return new Promise<Contador[]>((resolve) => {
        this.baseService
          .get('getContadores/'+arg0)
          .pipe(timeoutWith(5000, timer(5000).pipe(take(1))))
          .subscribe(
            (data: any) => {
              console.log(data)
              if (data['error'] == undefined) {
                
                resolve(data['data']);
              }
            },
            (error: any) => {
              
              console.log(error)
            }
          );
      });
  }
  putContador(selected_contador: Contador) {
    return new Promise<boolean>((resolve) => {
      this.baseService
        .put('putContador/'+selected_contador.id,selected_contador)
        .pipe(timeoutWith(5000, timer(5000).pipe(take(1))))
        .subscribe(
          (data: any) => {
            console.log(data)
         
            if (data['error'] == undefined) {
              console.log(data)
              resolve(true);
            }
          },
          (error: any) => {
            
            console.log(error)
          }
        );
    });
  }
  postContador(contador:Contador) {
    return new Promise<boolean>((resolve) => {
        this.baseService
          .post('postContador',contador)
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

}