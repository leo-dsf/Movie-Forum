import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm!: FormGroup;

  constructor(private form_builder: FormBuilder) {
  }

  get first_name() {
    return this.myForm.get('first_name')
  }

  get last_name() {
    return this.myForm.get('last_name')
  }

  get username() {
    return this.myForm.get('username')
  }

  get email() {
    return this.myForm.get('email')
  }

  get password() {
    return this.myForm.get('password')
  }

  ngOnInit() {

    this.myForm = this.form_builder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')])
    })

    this.myForm.valueChanges.subscribe(console.log)

  }

}
