import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private URL:string = "https://api.themoviedb.org/3";
  private API:string = "76783b6dbc60f58297b302f9bef9eb6d";

  constructor(private http: HttpClient) { }

  getMovieTopRated():any{
    return this.http.get(`${this.URL}/movie/top_rated?api_key=${this.API}`);
  }
  //retorno do tipo observable
  getMovies(param:string):Observable<any>{
    const url = `${this.URL}/movie/${param}?api_key=${this.API}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`O parametro requisitado foi: ${param}`)),
      catchError(this.handletError<any>(`Falha no getMovies parametro = ${param}`))
    );
  }
    private handletError<T>(Operator = 'Operation', result?: T){
      return (error: any):Observable<T> =>{
        console.log(error);//log do erro no console

        //matem o app rodando por ter retornado o obj vazio
        return of(result as T);
      };
  }
}
