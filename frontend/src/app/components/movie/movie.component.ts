import { Component } from '@angular/core';
import { MoviesService } from 'src/app/services/movies/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {

  movie: any;

  constructor(private service:MoviesService) {}

  ngOnInit() {
    //console.log(this.service.getMovie(13));
    this.service.getMovie(1).subscribe(response => {
      this.movie = response;

      //console.log(this.movieInfo["image_url"])

      //this.imageUrl = this.movieInfo["image_url"]
      //this.imageUrl = 'http://127.0.0.1:8000/ws/images/movie/the-godfather.jpg'
      //console.log('images/movie/the-godfather.jpg');

    })
  }

}
