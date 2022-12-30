import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {MoviesComponent} from "./components/movies/movies.component";
import {SessionComponent} from "./components/session/session.component";
import { MainComponent } from './components/main/main.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'session', component: SessionComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'movies', component: MoviesComponent, children:[{path: ':movie_id', component: MovieDetailsComponent}]}
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {
}
