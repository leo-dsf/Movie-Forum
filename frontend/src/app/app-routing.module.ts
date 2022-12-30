import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {MovieListComponent} from "./components/movie-list/movie-list.component";
import {SessionComponent} from "./components/session/session.component";
import { MainComponent } from './components/main/main.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MoviesComponent } from './components/movies/movies.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'session', component: SessionComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'movielist', component: MovieListComponent, children:[{path: ':type', component: MoviesComponent}, {path: 'search/:word', component: MoviesComponent}]},
  {path: 'movies/:movie_id', component: MovieDetailsComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {
}
