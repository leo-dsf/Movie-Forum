import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MoviesService} from "../../services/movies/movies.service";
import {Movie} from "../../models/movie";
import {DirectorService} from 'src/app/services/directors/director.service';
import {Director} from 'src/app/models/director';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.css']
})
export class UpdateMovieComponent {

  directors: Director[];
  movie_id: any;
  movie: any;
  director: any;
  movieForm!: FormGroup;
  public successMessage: string = '';
  public errorMessage: string = '';


  constructor(private router: Router, private _form_builder: FormBuilder, private route: ActivatedRoute, private moviesService: MoviesService, private directorService: DirectorService) {
    this.directors = [];
    this.movie_id = null
    this.movie = null
    this.director = null
  }

  ngOnInit() {

    this.directorService.getDirectors().subscribe((directors: Director[]) => {
        this.directors = directors;
      }, (error: any) => {
        console.log(error);
      }
    );


    this.route.paramMap.subscribe(params => {
      this.movie_id = params.get("movie_id");
    });

    this.moviesService.getMovie(this.movie_id).subscribe((data: Movie) => {
      this.movie = data;


      this.directorService.getDirector(this.movie.director).subscribe((data2: Director) => {
        this.director = data2;
      })

      this.movieForm = this._form_builder.group({
        title: [this.movie.title, Validators.required],
        director: new FormControl(this.movie.director, [Validators.required]),
        description: new FormControl(this.movie.description, [Validators.required]),
        rating: new FormControl(this.movie.rating, [Validators.required]),
        release_date: new FormControl(this.movie.release_date, [Validators.required]),
        image_url: new FormControl(this.movie.image_url, [Validators.required])
      })


    })


  }


  uploadImage(event: any) {
    const file = (event.target as HTMLInputElement).files![0];
    this.movieForm.patchValue({
      image_url: file
    });
    this.movieForm.get('image_url')!.updateValueAndValidity();
  }

  onSubmit() {

    this.moviesService.updateMovie(this.movie.id, this.movieForm.value).subscribe((response: any) => {
        // Reset the form and display a success message
        this.movieForm.reset();
        this.successMessage = 'Movie updated successfully!';
        this.router.navigate(['/movies/' + this.movie.id]);

      }, (error: any) => {
        // Display an error message
        console.log(this.movieForm.value);
        this.errorMessage = 'Error updating movie. Please try again.';
      }
    );

  }

}
