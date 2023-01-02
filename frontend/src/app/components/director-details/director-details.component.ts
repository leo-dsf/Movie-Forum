import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Director} from 'src/app/models/director';
import {Movie} from 'src/app/models/movie';
import {DirectorService} from 'src/app/services/directors/director.service';
import {MoviesService} from 'src/app/services/movies/movies.service';
import {AuthorizationService} from "../../services/authorization/authorization.service";
import {UserService} from "../../services/user/user.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-director-details',
  templateUrl: './director-details.component.html',
  styleUrls: ['./director-details.component.css']
})
export class DirectorDetailsComponent {

  director_id: any;
  director: any;
  movies: any;
  public user: User | undefined;
  private authorizationService: AuthorizationService;
  private userService: UserService;

  constructor(private router: Router, authorizationService: AuthorizationService, userService: UserService, private route: ActivatedRoute, private moviesService: MoviesService, private directorService: DirectorService) {
    this.director_id = null
    this.movies = null
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
      this.director_id = params.get("director_id");
      console.log(this.director_id);
    });

    this.directorService.getDirector(this.director_id).subscribe((data2: Director) => {
      this.director = data2;
    })
    console.log(this.director);

    this.moviesService.getDirectorMovies(this.director_id).subscribe((data1: Movie[]) => {
      this.movies = data1;
      console.log(this.movies);
    })
  }

  delete() {

    console.log(this.director_id)

    this.directorService.deleteDirector(this.director_id).subscribe((data: Movie) => {
      this.router.navigate(['']);
    })

  }
}
