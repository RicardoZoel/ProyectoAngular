import { Injectable } from '@angular/core';
import { Usuario } from '../Modelos/Usuario';
import { BaseService } from '../Servicios/base.service';

import { timer } from 'rxjs';
import { take, timeoutWith } from 'rxjs/operators';
import { Empresa } from '../Modelos/Emresa';
import { Agua } from '../Modelos/Agua';

@Injectable({
  providedIn: 'root',
})
export class EmpresaControlador {
  editarAgua(editableAgua: Agua) { 
    return new Promise<boolean>((resolve) => {
      this.baseService
        .put('putAgua/',editableAgua)
        .pipe(timeoutWith(5000, timer(5000).pipe(take(1))))
        .subscribe(
          (data: any) => {
         
            if (data['error'] == undefined) {
              resolve(true);
            }
          },
          (error: any) => {
            
            console.log(error)
          }
        );
    });
  
  }
  editarEmpresa(editableEmpresa: Empresa) {
    return new Promise<boolean>((resolve) => {
      this.baseService
        .put('putEmpresa/',editableEmpresa)
        .pipe(timeoutWith(5000, timer(5000).pipe(take(1))))
        .subscribe(
          (data: any) => {
         
            if (data['error'] == undefined) {
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
getEmpresa(): any {
    console.log("data")
    return new Promise<Empresa>((resolve) => {
        this.baseService
          .get('getEmpresa')
          .pipe(timeoutWith(5000, timer(5000).pipe(take(1))))
          .subscribe(
            (data: any) => {
           
              if (data['error'] == undefined) {
                resolve(data['data'][0]);
              }
            },
            (error: any) => {
              
              console.log(error)
            }
          );
      });
  }
  getAgua(): any {
    console.log("data")
    return new Promise<Agua>((resolve) => {
        this.baseService
          .get('getAgua')
          .pipe(timeoutWith(5000, timer(5000).pipe(take(1))))
          .subscribe(
            (data: any) => {
           
              if (data['error'] == undefined) {
                resolve(data['data'][0]);
              }
            },
            (error: any) => {
              
              console.log(error)
            }
          );
      });
  }
}