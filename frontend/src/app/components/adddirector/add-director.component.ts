import {Component} from '@angular/core';
import {DirectorService} from "../../services/directors/director.service";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-adddirector',
  templateUrl: './add-director.component.html',
  styleUrls: ['./add-director.component.css']
})
export class AddDirectorComponent {
  public successMessage: string = '';
  public errorMessage: string = '';
  directorForm!: FormGroup;
  private directorService: DirectorService;

  constructor(private _form_builder: FormBuilder, directorService: DirectorService) {
    this.directorService = directorService;
  }

  ngOnInit() {
    this.directorForm = this._form_builder.group({
      name: ['', Validators.required],
      age: new FormControl('', [Validators.required]),
      image_url: new FormControl('', [Validators.required])
    })
  }

  uploadImage(event: any) {
    const file = (event.target as HTMLInputElement).files![0];
    this.directorForm.patchValue({
      image_url: file
    });
    this.directorForm.get('image_url')!.updateValueAndValidity();
  }

  onSubmit() {
    this.directorService.addDirector(this.directorForm.value).subscribe((response: any) => {
        // Reset the form and display a success message
        this.directorForm.reset();
        this.successMessage = 'Director added successfully!';
      }, (error: any) => {
        // Display an error message
        console.log(this.directorForm.value);
        this.errorMessage = 'Error adding director. Please try again.';
      }
    );
  }
}
