import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthorizationService} from "../authorization/authorization.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authService = this.injector.get(AuthorizationService);
    if (authService.isAuthenticated()) {
      const tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Token ${authService.getToken()}`
        }
      });
      return next.handle(tokenizedReq);
    }
    return next.handle(req);
  }
}
