import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ALL_API } from '../constantes.utils';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root',
})
export class BaseService {

  constructor(private http: HttpClient, private localService: LocalService) {}

  public get<T>(
    pathObject: string,
    pathObjectFilter: string = '',
    id: number = 0,
    custom: string = ''
  ) {
    const url = `${ALL_API}${pathObject}`;
    const headers = { headers: this.localService.headers };
    if (pathObjectFilter === '' && custom === '') {
      console.log(`${url}/${url}`);
      return this.http.get<T>(`${url}`, headers);
    }
    if (pathObjectFilter === '') {
      console.log(`${url}/${custom}`);
      return this.http.get<T>(`${url}/${custom}`, headers);
    }
    if (custom === '') {
      console.log(`${url}/${pathObjectFilter}/${id}`);
      return this.http.get<T>(`${url}/${pathObjectFilter}/${id}`, headers);
    }
    console.log(`${url}/${pathObjectFilter}/${id}/${custom}`);
    return this.http.get<T>(
      `${url}/${pathObjectFilter}/${id}/${custom}`,
      headers
    );
  }

  public post<T>(path: string, data: any): Observable<T> {
    return this.http.post<T>(`${ALL_API}${path}` + '/0', data, {
      headers: this.localService.headers,
    });
  }

  public put<T>(path: string, data: any): Observable<T> {
    return this.http.put<T>(`${ALL_API}${path}` + '/' + data.id, data, {
      headers: this.localService.headers,
    });
  }

  public delete<T>(path: string, ids: any): Observable<T> {
    return this.http.post<T>(`${ALL_API}${path}` + '/batchdelete', ids, {
      headers: this.localService.headers,
    });
  }

  deleteRelation<T>(path: string) : Observable<T>{
    return this.http.delete<T>(`${ALL_API}${path}`, {
      headers: this.localService.headers,
    });
  }

  public login(username: string, password: string) {
    const body = { username, password };
    return this.http.post(`${ALL_API}users/login`, body);
  }

  public cambioDeContraseña<T>(pathObject: string, data: any){
      
    const url = `${ALL_API}${pathObject}`;

    return this.http.post<T>(url, data, {
      headers: this.localService.headers,
    });
  }
}
