import {Component} from '@angular/core';
import {MoviesService} from 'src/app/services/movies/movies.service';


@Component({
  selector: 'app-main-movies',
  templateUrl: './main-movies.component.html',
  styleUrls: ['./main-movies.component.css']
})
export class MainMoviesComponent {

  movies_release_date: any;
  movies_rating: any;

  movies_reviews: any;

  constructor(private service: MoviesService) {
  }

  ngOnInit() {
    this.service.getRecentMovies().subscribe(data => {
      this.movies_release_date = data.slice(0, 4);
    });
    this.service.getTopMovies().subscribe(data => {
      // Only get the first 4 movies
      this.movies_rating = data.slice(0, 4);
    });
    this.service.getMostReviewedMovies().subscribe(data => {
      // Only get the first 4 movies
      this.movies_reviews = data.slice(0, 4);
    });
  }
}
