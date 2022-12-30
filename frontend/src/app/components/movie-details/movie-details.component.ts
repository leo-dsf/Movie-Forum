import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {MoviesService} from "../../services/movies/movies.service";
import {Movie} from "../../models/movie";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {

  movie_id : any;
  movie : any;

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) { 
    this.movie_id = null
    this.movie = null
  }

  ngOnInit(){
    //this.movie = this.route.paramMap.pipe(
    console.log(this.route.paramMap)
    
    this.route.paramMap.subscribe(params => {
      this.movie_id = params.get("movie_id"); 
    });

    this.moviesService.getMovie(this.movie_id).subscribe((data: Movie) => { 
      this.movie = data;
    })
    
    
  }

}
