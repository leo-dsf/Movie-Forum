import {Component} from '@angular/core';
import {DirectorService} from "../../services/directors/director.service";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Director} from 'src/app/models/director';

@Component({
  selector: 'app-update-director',
  templateUrl: './update-director.component.html',
  styleUrls: ['./update-director.component.css']
})
export class UpdateDirectorComponent {


  director_id: any;
  director: any;
  movies: any;
  public successMessage: string = '';
  public errorMessage: string = '';
  directorForm!: FormGroup;

  constructor(private router: Router, private _form_builder: FormBuilder, private route: ActivatedRoute, private directorService: DirectorService) {
    this.directorService = directorService;
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.director_id = params.get("director_id");

    });
    console.log(this.director_id);

    this.directorService.getDirector(this.director_id).subscribe((data2: Director) => {
      this.director = data2;
      console.log(this.director.name)
      this.directorForm = this._form_builder.group({
        name: [this.director.name, Validators.required],
        age: new FormControl(this.director.age, [Validators.required]),
        image_url: new FormControl(this.director.image_url, [Validators.required])
      })
    })
    console.log(this.director);


  }

  uploadImage(event: any) {
    const file = (event.target as HTMLInputElement).files![0];
    this.directorForm.patchValue({
      image_url: file
    });
    this.directorForm.get('image_url')!.updateValueAndValidity();
  }

  onSubmit() {
    this.directorService.updateDirector(this.director_id, this.directorForm.value).subscribe((response: any) => {
        // Reset the form and display a success message
        this.directorForm.reset();
        this.successMessage = 'Director updated successfully!';
        this.router.navigate(['/directors/' + this.director_id]);
      }, (error: any) => {
        // Display an error message
        console.log(this.directorForm.value);
        this.errorMessage = 'Error updating director. Please try again.';
      }
    );
  }
}

