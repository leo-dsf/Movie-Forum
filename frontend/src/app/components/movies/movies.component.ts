import {Component, OnInit} from '@angular/core';
import {MoviesService} from "../../services/movies/movies.service";
import {Movie} from "../../models/movie";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  private moviesService: MoviesService;
  movies: Movie[];

  constructor(moviesService: MoviesService) {
    this.moviesService = moviesService;
    this.movies = [];
  }

  ngOnInit() {
    this.moviesService.getMovies().subscribe((data: Movie[]) => {
      this.movies = data;
      console.log(this.movies);
    })
  }
}
