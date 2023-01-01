import { Component, Input } from '@angular/core';
import { MoviesService } from 'src/app/services/movies/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {

  @Input() image_url: string | undefined;
  @Input() rating: number | undefined;


  constructor() {}

  ngOnInit() {
    //console.log(this.service.getMovie(13));

  }

}
