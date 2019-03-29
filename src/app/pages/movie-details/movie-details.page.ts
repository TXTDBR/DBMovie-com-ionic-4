import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ProviderService } from 'src/app/services/provider.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {

  public movie = [];
  constructor(private mdbService: ProviderService,
    private loadingController: LoadingController,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.topRatedMovies();
  }

  async topRatedMovies(){
    const loading = await this.loadingController.create({
      message: 'Carregando filmes...'
    });
  
    await loading.present();
    this.mdbService.getMovies(this.route.snapshot.paramMap.get('id')).subscribe(
      data=>{
        /*let resposta = (data as any)._body;
        resposta = JSON.parse(resposta);
        console.log(resposta);*/
        this.movie = data;
        console.log(this.movie);
        loading.dismiss();
    }, error=>{
      console.log(error);
    }).add();
  }

  doRefresh(event) {
  this.topRatedMovies();
  }
}
