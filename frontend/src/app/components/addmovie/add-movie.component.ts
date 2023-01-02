import {Component} from '@angular/core';
import {Director} from "../../models/director";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MoviesService} from "../../services/movies/movies.service";
import {DirectorService} from "../../services/directors/director.service";

@Component({
  selector: 'app-addmovie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent {
  directors: Director[];
  movieForm!: FormGroup;
  public successMessage: string = '';
  public errorMessage: string = '';
  private moviesService: MoviesService;
  private directorService: DirectorService;

  constructor(private _form_builder: FormBuilder, moviesService: MoviesService, directorService: DirectorService) {
    this.directors = [];
    this.moviesService = moviesService;
    this.directorService = directorService;
  }

  ngOnInit() {
    this.directorService.getDirectors().subscribe((directors: Director[]) => {
        this.directors = directors;
      }, (error: any) => {
        console.log(error);
      }
    );
    this.movieForm = this._form_builder.group({
      title: ['', Validators.required],
      director: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      rating: new FormControl('', [Validators.required]),
      release_date: new FormControl('', [Validators.required]),
      image_url: new FormControl('', [Validators.required])
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
    this.moviesService.addMovie(this.movieForm.value).subscribe((response: any) => {
        // Reset the form and display a success message
        this.movieForm.reset();
        this.successMessage = 'Movie added successfully!';
      }, (error: any) => {
        // Display an error message
        console.log(this.movieForm.value);
        this.errorMessage = 'Error adding movie. Please try again.';
      }
    );
  }
}
