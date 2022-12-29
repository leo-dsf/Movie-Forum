import { Component } from '@angular/core';
import { MoviesService } from 'src/app/services/movies/movies.service';


@Component({
  selector: 'app-main-movies',
  templateUrl: './main-movies.component.html',
  styleUrls: ['./main-movies.component.css']
})
export class MainMoviesComponent {
  
  movies: any;

  constructor(private service:MoviesService) {}

  ngOnInit() {
    //console.log(this.service.getMovie(13));
    this.service.getRandomMovies().subscribe(response => {
      this.movies = response;
      console.log(this.movies)

      

      //console.log(this.movieInfo["image_url"])

      //this.imageUrl = this.movieInfo["image_url"]
      //this.imageUrl = 'http://127.0.0.1:8000/ws/images/movie/the-godfather.jpg'
      //console.log('images/movie/the-godfather.jpg');

    })
  }

}
