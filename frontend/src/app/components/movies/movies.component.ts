import {Component, OnInit} from '@angular/core';
import {MoviesService} from "../../services/movies/movies.service";
import {Movie} from "../../models/movie";
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  type: string | null;
  movies$: Observable<Movie[]> | null;
  movies: Movie[];
  private moviesService: MoviesService;

  constructor(private route: ActivatedRoute, moviesService: MoviesService) {
    this.moviesService = moviesService;
    this.movies = [];
    this.type = "";
    this.movies$ = null;
  }

  ngOnInit() {

    console.log(this.route.paramMap)

    this.movies$ = this.route.paramMap.pipe(
      switchMap(
        params => {
          this.type = params.get("type");

          console.log(this.type)

          switch (this.type) {

            case 'All':
              return this.moviesService.getMovies();

            case "Latest":
              return this.moviesService.getRecentMovies();

            case "TopRated":
              return this.moviesService.getTopMovies();

            case "MostReviews":
              return this.moviesService.getMostReviewedMovies();

            case null:
              let word = params.get("word");
              if (word != null)
                return this.moviesService.searchMovies(word);
          }

          return this.moviesService.getMovies();
        }
      )
    );


  }


}
