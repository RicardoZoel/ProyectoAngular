import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ALL_API, IS_IN_SERVER } from '../constantes.utils';

const aesvar: string = 'oberta2022**';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  private URLcheckLogin = `${ALL_API}login/checklogin`;
  headers = new HttpHeaders({
    'content-type': 'application/json',
    'X-Embarcadero-Session-Token': this.getLocalSessionData('sessionToken')!,
  });

  constructor(
    public http: HttpClient,
    private router: Router,
  ) {}

  setLocalSessionData(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  getLocalSessionData(key: string) {
    return sessionStorage.getItem(key);
  }
  getEmpresa() {
    var id = '';
    this.http
      .get(`${ALL_API}empresa/getempresa`, { headers: this.headers })
      .subscribe({
        next: (data: any) => {
          this.setLocalSessionData('empresa', data.idempresa);
          this.setLocalSessionData('usuario', data.idusuario);
        },
        error: () => {
          id = '0';
        },
      });
    return id;
  }

 checkLocalSessionToken() {
    if (IS_IN_SERVER) {
      if (
        this.getLocalSessionData('sessionToken') != null ||
        this.getLocalSessionData('sessionToken') != undefined
      ) {
        var bool = false;
        this.http.get(this.URLcheckLogin, { headers: this.headers }).subscribe({
          next: async (data: any) => {
           // this.errorManager.manageError(data);
           bool = true;
          },
          error: async (data: any) => {
         //  this.errorManager.manageError(data);
          },
        });
        return  bool;
      } else {
        return false;
      }
    } else {
    
     return false;
    }
  }

  localSessionClear() {
    sessionStorage.clear();
  }
  refreshHeaders() {
    this.headers = new HttpHeaders({
      'content-type': 'application/json',
      'X-Embarcadero-Session-Token': this.getLocalSessionData('sessionToken')!,
    });
  }
}
