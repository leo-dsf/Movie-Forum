import {Component} from '@angular/core';
import {AuthorizationService} from "../../services/authorization/authorization.service";
import {UserService} from "../../services/user/user.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent {
  private authorizationService: AuthorizationService;
  private userService: UserService;
  public user: User | undefined;

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
    this.authorizationService.logout();
  }

}
