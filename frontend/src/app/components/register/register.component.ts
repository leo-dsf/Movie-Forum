import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthorizationService} from "../../services/authorization/authorization.service";
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public failure: boolean;
  registerForm!: FormGroup;
  private authorizationService: AuthorizationService;
  private router: Router;


  constructor(authorizationService: AuthorizationService, router: Router, private _form_builder: FormBuilder) {
    this.authorizationService = authorizationService;
    this.router = router;
    this.failure = false;
  }

  get first_name() {
    return this.registerForm.get('first_name')
  }

  get last_name() {
    return this.registerForm.get('last_name')
  }

  get username() {
    return this.registerForm.get('username')
  }

  get email() {
    return this.registerForm.get('email')
  }

  get password() {
    return this.registerForm.get('password')
  }

  ngOnInit() {
    this.registerForm = this._form_builder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  onSubmit() {
    this.authorizationService.register(this.registerForm.value).subscribe((data: any) => {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/']);
      }, (error: HttpErrorResponse) => {
        this.failure = true;
        console.log(error);
      }
    );
  }

}
