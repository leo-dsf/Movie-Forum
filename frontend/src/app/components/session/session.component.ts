import {Component} from '@angular/core';
import {AuthorizationService} from "../../services/authorization/authorization.service";
import {UserService} from "../../services/user/user.service";
import {User} from "../../models/user";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent {
  public user: User | undefined;
  private authorizationService: AuthorizationService;
  private userService: UserService;

  constructor(authorizationService: AuthorizationService, userService: UserService) {
    this.authorizationService = authorizationService;
    this.userService = userService;
  }

  ngOnInit() {
    if (this.authorizationService.isAuthenticated()) {
      this.userService.getUser().subscribe(user => {
        this.user = user;
      });
    }
  }

  logout() {
    this.authorizationService.logout().subscribe((data: any) => {
      window.location.reload();
      localStorage.removeItem('token');
      localStorage.clear()
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

}
