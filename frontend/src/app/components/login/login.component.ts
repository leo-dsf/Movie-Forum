import {Component} from '@angular/core';
import {AuthorizationService} from "../../services/authorization/authorization.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public failure: boolean;
  private authorizationService: AuthorizationService;
  private router: Router;

  constructor(authorizationService: AuthorizationService, router: Router) {
    this.authorizationService = authorizationService;
    this.router = router;
    this.failure = false;
  }

  onSubmit(username: string, password: string) {
    this.authorizationService.login(username, password).subscribe((data: any) => {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/']);
      }, (error: HttpErrorResponse) => {
        this.failure = true;
      }
    );
  }
}
