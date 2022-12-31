import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {MoviesService} from "../../services/movies/movies.service";
import {Movie} from "../../models/movie";
import { DirectorService } from 'src/app/services/directors/director.service';
import { Director } from 'src/app/models/director';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {

  movie_id : any;
  movie : any;
  director : any;

  constructor(private route: ActivatedRoute, private moviesService: MoviesService, private directorService: DirectorService) { 
    this.movie_id = null
    this.movie = null
    this.director = null
  }

  ngOnInit(){ 
    
    this.route.paramMap.subscribe(params => {
      this.movie_id = params.get("movie_id"); 
    });

    this.moviesService.getMovie(this.movie_id).subscribe((data: Movie) => { 
      this.movie = data;
       
 
      this.directorService.getDirector(this.movie.director).subscribe((data2: Director) => { 
        this.director = data2;  
      })

     
    })

    
    
  }

}
