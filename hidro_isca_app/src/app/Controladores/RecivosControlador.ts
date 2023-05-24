import { Injectable } from '@angular/core';
import { BaseService } from '../Servicios/base.service';

import { timer } from 'rxjs';
import { take, timeoutWith } from 'rxjs/operators';
import { Empresa } from '../Modelos/Emresa';
import { Agua } from '../Modelos/Agua';
import { Recivos } from '../Modelos/Recivos';

@Injectable({
  providedIn: 'root',
})
export class RecivosControlador {
    constructor(private baseService: BaseService){}
    getRecivos(): any {
    return new Promise<Recivos[]>((resolve) => {
        this.baseService
          .get('getRecivos')
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

  putRecivo(selected_recivo: Recivos) {
    console.log(JSON.stringify(selected_recivo))
    return new Promise<boolean>((resolve) => {
      this.baseService
        .put('putRecivo/'+selected_recivo.id,selected_recivo)
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
  postRecivo(recivo:Recivos) {
    return new Promise<boolean>((resolve) => {
        this.baseService
          .post('postRecivo',recivo)
          .pipe(timeoutWith(5000, timer(5000).pipe(take(1))))
          .subscribe(
            (data: any) => {
           
              if (data['result']['error'] == undefined) {
                console.log(data);
                console.log(data['data']);
                resolve(true);
              }else{
                console.log(data);
              }
            },
            (error: any) => {
              
              resolve(false);
            }
          );
      });
  }

}