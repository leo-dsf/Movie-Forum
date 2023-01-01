import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Director } from 'src/app/models/director';
import { DirectorService } from 'src/app/services/directors/director.service';
import { MoviesService } from 'src/app/services/movies/movies.service';

@Component({
  selector: 'app-director-details',
  templateUrl: './director-details.component.html',
  styleUrls: ['./director-details.component.css']
})
export class DirectorDetailsComponent {

  director_id : any;
  director : any;
  movies: any;


  constructor(private route: ActivatedRoute, private moviesService: MoviesService, private directorService: DirectorService) { 
    this.director_id = null
    this.movies = null
    this.director = null
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.director_id = params.get("director_id"); 
      console.log(this.director_id);
    });

    this.directorService.getDirector(this.director_id).subscribe((data2: Director) => { 
      this.director = data2;  
    })
    console.log(this.director);
  }


}
