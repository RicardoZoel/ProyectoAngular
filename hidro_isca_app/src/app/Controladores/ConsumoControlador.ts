import { Injectable } from '@angular/core';
import { BaseService } from '../Servicios/base.service';

import { timer } from 'rxjs';
import { take, timeoutWith } from 'rxjs/operators';
import { Empresa } from '../Modelos/Emresa';
import { Agua } from '../Modelos/Agua';
import { Consumo } from '../Modelos/Consumo';

@Injectable({
  providedIn: 'root',
})
export class ConsumoControlador {
    constructor(private baseService: BaseService){}
  getConsumos(): any {
    return new Promise<Consumo[]>((resolve) => {
        this.baseService
          .get('getConsumos')
          .pipe(timeoutWith(5000, timer(5000).pipe(take(1))))
          .subscribe(
            (data: any) => {
           
              if (data['error'] == undefined) {
                //console.log(data['data'])
                resolve(data['data']);
              }
            },
            (error: any) => {
              
              //console.log(error)
            }
          );
      });
  }

  putConsumo(selected_consumo: Consumo) {
    //console.log(JSON.stringify(selected_consumo))
    return new Promise<boolean>((resolve) => {
      this.baseService
        .put('putConsumo/'+selected_consumo.id,selected_consumo)
        .pipe(timeoutWith(5000, timer(5000).pipe(take(1))))
        .subscribe(
          (data: any) => {
         
            if (data['error'] == undefined) {
              //console.log(data)
              //console.log(data['data'])
              resolve(true);
            }
          },
          (error: any) => {
            
            //console.log(error)
          }
        );
    });
  }
  postConsumo(consumo:Consumo) {
    return new Promise<boolean>((resolve) => {
        this.baseService
          .post('postConsumo',consumo)
          .pipe(timeoutWith(5000, timer(5000).pipe(take(1))))
          .subscribe(
            (data: any) => {
           
              if (data['error'] == undefined) {
                //console.log(data)
                //console.log(data['data'])
                resolve(true);
              }
            },
            (error: any) => {
              
              //console.log(error)
            }
          );
      });
  }

}