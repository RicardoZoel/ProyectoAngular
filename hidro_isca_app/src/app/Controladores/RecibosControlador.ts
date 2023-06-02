import { Injectable } from '@angular/core';
import { BaseService } from '../Servicios/base.service';

import { timer } from 'rxjs';
import { take, timeoutWith } from 'rxjs/operators';
import { Empresa } from '../Modelos/Emresa';
import { Agua } from '../Modelos/Agua';
import { Recibos } from '../Modelos/Recibos';

@Injectable({
  providedIn: 'root',
})
export class RecibosControlador {
  pagarRecibo(selected_Recibo: Recibos) {
    throw new Error('Method not implemented.');
  }
    constructor(private baseService: BaseService){}
    getRecibos(): any {
    return new Promise<Recibos[]>((resolve) => {
        this.baseService
          .get('getRecivos')
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

  putRecibo(selected_Recibo: Recibos) {
    //console.log(JSON.stringify(selected_Recibo))
    return new Promise<boolean>((resolve) => {
      this.baseService
        .put('putRecivo/'+selected_Recibo.id,selected_Recibo)
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
  postRecibo(Recibo:Recibos) {
    return new Promise<boolean>((resolve) => {
        this.baseService
          .post('postRecivo',Recibo)
          .pipe(timeoutWith(5000, timer(5000).pipe(take(1))))
          .subscribe(
            (data: any) => {
           
              if (data['result']['error'] == undefined) {
                //console.log(data);
                //console.log(data['data']);
                resolve(true);
              }else{
                //console.log(data);
              }
            },
            (error: any) => {
              
              resolve(false);
            }
          );
      });
  }

}