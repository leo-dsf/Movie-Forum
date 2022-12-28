import {Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  responsiveOptions: any;
  searchQuery: string;
  searchResults: any;

  constructor(private movieService: MovieService) {

  }

  ngOnInit() {
    this.movieService.getMovies().subscribe((data: any) =>{
      this.searchResults = data.results;
      console.log(this.searchResults);
    })
  }
}
