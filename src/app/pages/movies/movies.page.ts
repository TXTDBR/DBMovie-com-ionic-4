import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  providers: [
    ProviderService
  ]
})
export class MoviesPage implements OnInit {

  public movies: any = [];
  private categorias = ["popular", "top_rated", "now_playing", "upcoming"];
  private movie_name: string;
  constructor(private mdbService: ProviderService,
    private loadingController: LoadingController) { }
  ngOnInit() {
    this.topRatedMovies();
  }



  async topRatedMovies(index?) {
    index = (typeof index === 'undefined') ? 4 : Math.floor(Math.random() * 4);
    let param = (this.movie_name === 'undefined') ? this.categorias[index] : `search/movie?query="${this.movie_name}&include_adult=false&`;
    const loading = await this.loadingController.create({
      message: 'Carregando filmes...'
    });

    await loading.present();
    this.mdbService.getMovies(param).subscribe(
      data => {
        /*let resposta = (data as any)._body;
        resposta = JSON.parse(resposta);
        console.log(resposta);*/
        this.movies = data.results;
        loading.dismiss();
      }, error => {
        console.log(error);
      }).add();
  }

  doRefresh(event) {
    this.topRatedMovies('radom');
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
