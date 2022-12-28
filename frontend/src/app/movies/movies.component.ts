import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  responsiveOptions: any;

  constructor(private movieService: MovieService) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit() {
    this.movieService.getMovies().subscribe(
      this.movieService.getTopRatedMovies(page).pipe(delay(2000)).subscribe((res: any) => {
        this.movies = data;
        this.movies = this.movies.results;
      },
      error => {
        console.log(error);
      }
    );
  }
}
