import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {MoviesComponent} from "./components/movies/movies.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'movies', component: MoviesComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {
}
