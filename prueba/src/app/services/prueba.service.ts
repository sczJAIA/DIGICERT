import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  url = 'https://reqres.in/api/users';
  constructor(
    private http: HttpClient
  ) { }

  getUserId(userId: string){
    try {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      // const params = new HttpParams()
      // .append('userId', userId);
      return this.http.get(
        this.url + '/' + userId, {
          headers
        } 
      ).pipe(
        map(
          (resp) => {
            return resp;
          }),
        catchError((error) => {
          console.log('error al ver el pedido', error);
          return throwError(error);
        })
      );
    } catch (error) {
      return throwError(error);
    }
  }

  getUserList(page: string){
    try {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      const params = new URLSearchParams()
      .append('page', page);
      return this.http.get(
        this.url + '?page=' + page, {
          
        } 
      ).pipe(
        map(
          (resp) => {
            return resp;
          }),
        catchError((error) => {
          console.log('error al ver el pedido', error);
          return throwError(error);
        })
      );
    } catch (error) {
      return throwError(error);
    }
  }

  createUsers(user: any){
    try {
      const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
      const params = new URLSearchParams();
      params.set('name', user.user);
      params.set('job', user.job);
      return this.http.post(
        this.url, params.toString(), {
          headers
        }
      ).pipe(
        map((resp) => {
          console.log('Respuesta de rechazar pedido', resp);
          return resp;
        }), catchError( (error) => {
          console.log('Ha ocurrido un error', error);
          return throwError(error);
        } )
      );
    } catch (error) {
      return throwError(error);
    }
  }
}
