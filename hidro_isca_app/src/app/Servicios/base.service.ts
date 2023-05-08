import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ALL_API } from '../constantes.utils';

@Injectable({
  providedIn: 'root',
})
export class BaseService {

  constructor(private http: HttpClient) {}

  public get<T>(
    pathObject: string,
    pathObjectFilter: string = '',
    id: number = 0,
    custom: string = ''
  ) {
    const url = `${ALL_API}${pathObject}`;
    if (pathObjectFilter === '' && custom === '') {
      console.log(`${url}/${url}`);
      return this.http.get<T>(`${url}`);
    }
    if (pathObjectFilter === '') {
      console.log(`${url}/${custom}`);
      return this.http.get<T>(`${url}/${custom}`);
    }
    if (custom === '') {
      console.log(`${url}/${pathObjectFilter}/${id}`);
      return this.http.get<T>(`${url}/${pathObjectFilter}/${id}`);
    }
    console.log(`${url}/${pathObjectFilter}/${id}/${custom}`);
    return this.http.get<T>(
      `${url}/${pathObjectFilter}/${id}/${custom}`
    );
  }

  public post<T>(path: string, data: any): Observable<T> {
    return this.http.post<T>(`${ALL_API}${path}` + '/0', data, {
      
    });
  }

  public put<T>(path: string, data: any): Observable<T> {
    return this.http.put<T>(`${ALL_API}${path}` + '/' + data.id, data, {
      
    });
  }

  public delete<T>(path: string, ids: any): Observable<T> {
    return this.http.post<T>(`${ALL_API}${path}` + '/batchdelete', ids, {
      
    });
  }

  deleteRelation<T>(path: string) : Observable<T>{
    return this.http.delete<T>(`${ALL_API}${path}`, {
      
    });
  }

  public login(username: string, password: string) {
    const body = { username, password };
    return this.http.post(`${ALL_API}users/login`, body);
  }

  public cambioDeContraseña<T>(pathObject: string, data: any){
      
    const url = `${ALL_API}${pathObject}`;

    return this.http.post<T>(url, data, {
      
    });
  }
}
