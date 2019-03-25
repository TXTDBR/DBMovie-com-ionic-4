import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private URL:string = "https://api.themoviedb.org/3";
  private API:string = "76783b6dbc60f58297b302f9bef9eb6d";

  constructor(private http: Http) { }

  getMovieTopRated():any{
    return this.http.get(`${this.URL}/movie/top_rated?api_key=${this.API}`);
  }
}
