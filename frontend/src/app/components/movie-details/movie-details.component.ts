import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MoviesService} from "../../services/movies/movies.service";
import {Movie} from "../../models/movie";
import {DirectorService} from 'src/app/services/directors/director.service';
import {Director} from 'src/app/models/director';
import {AuthorizationService} from "../../services/authorization/authorization.service";
import {UserService} from "../../services/user/user.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {

  movie_id: any;
  movie: any;
  director: any;
  public user: User | undefined;
  private authorizationService: AuthorizationService;
  private userService: UserService;

  constructor(private router: Router, authorizationService: AuthorizationService, userService: UserService, private route: ActivatedRoute, private moviesService: MoviesService, private directorService: DirectorService) {
    this.movie_id = null
    this.movie = null
    this.director = null
    this.authorizationService = authorizationService;
    this.userService = userService;
  }

  ngOnInit() {

    if (this.authorizationService.isAuthenticated()) {
      this.userService.getUser().subscribe(user => {
        this.user = user;
      });
    }

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

  delete() {

    console.log(this.movie_id)

    this.moviesService.deleteMovie(this.movie_id).subscribe((data: Movie) => {
      this.router.navigate(['']);
    })

  }

}
