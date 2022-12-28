import {Component} from '@angular/core';
import {AuthorizationService} from "../../services/authorization/authorization.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private authorizationService: AuthorizationService;
  private router: Router;
  private failure: boolean;

  constructor(authorizationService: AuthorizationService, router: Router) {
    this.authorizationService = authorizationService;
    this.router = router;
    this.failure = false;
  }

  onSubmit(username: string, password: string) {
    this.authorizationService.login(username, password).subscribe((data: any) => {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/']);
      }, error => {
        this.failure = true;
      }
    );
  }
}
