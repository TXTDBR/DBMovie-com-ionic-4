import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  providers: [
    ProviderService
  ]
})
export class MoviesPage implements OnInit {
  public movies:any = [];

  constructor(private mdbService: ProviderService) { }
  ngOnInit() { 
    this.topRatedMovies();
  }

  topRatedMovies(){
    this.mdbService.getMovieTopRated().subscribe(
      data=>{
        let resposta = (data as any)._body;
        resposta = JSON.parse(resposta);
        console.log(resposta);
        this.movies = resposta.results;
    }, error=>{
      console.log(error);
    });
  }

}
