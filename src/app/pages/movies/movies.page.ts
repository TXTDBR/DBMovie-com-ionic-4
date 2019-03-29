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
  
  public movies:any = [];
  private param:string = "top_rated";

  constructor(private mdbService: ProviderService,
    private loadingController: LoadingController) { }
  ngOnInit() { 
    this.topRatedMovies();
  }
  
  

  async topRatedMovies(){
    const loading = await this.loadingController.create({
      message: 'Carregando filmes...'
    });
  
    await loading.present();
    this.mdbService.getMovies(this.param).subscribe(
      data=>{
        /*let resposta = (data as any)._body;
        resposta = JSON.parse(resposta);
        console.log(resposta);*/
        this.movies = data.results;
        loading.dismiss();
    }, error=>{
      console.log(error);
    }).add();
  }

  doRefresh(event) {
  

    }
}
