import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from "@angular/material/icon";

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {MainComponent} from './components/main/main.component';
import {HeaderComponent} from './components/header/header.component';
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {FooterComponent} from './components/footer/footer.component';
import {RegisterComponent} from './components/register/register.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {MovieComponent} from './components/movie/movie.component';
import {LoginComponent} from './components/login/login.component';
import {InterceptorService} from "./services/interceptor/interceptor.service";
import {AuthorizationService} from "./services/authorization/authorization.service";
import {MoviesComponent} from "./components/movies/movies.component";
import {SessionComponent} from './components/session/session.component';
import {MainMoviesComponent} from './components/main-movies/main-movies.component';
import {MovieDetailsComponent} from './components/movie-details/movie-details.component';
import {MovieListComponent} from './components/movie-list/movie-list.component';
import {MovieListToolbarComponent} from './components/movie-list-toolbar/movie-list-toolbar.component';
import {ReviewsComponent} from './components/reviews/reviews.component';
import {AddMovieComponent} from './components/addmovie/add-movie.component';
import {MatSelectModule} from "@angular/material/select";
import {DirectorListComponent} from './components/director-list/director-list.component';
import {DirectorsComponent} from './components/directors/directors.component';
import {DirectorComponent} from './components/director/director.component';
import {DirectorDetailsComponent} from './components/director-details/director-details.component';
import {DirectorMoviesComponent} from './components/director-movies/director-movies.component';
import {AddDirectorComponent} from "./components/adddirector/add-director.component";
import {UpdateMovieComponent} from './components/update-movie/update-movie.component';
import {UpdateDirectorComponent} from './components/update-director/update-director.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    SearchBarComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    ToolbarComponent,
    MovieComponent,
    LoginComponent,
    MainMoviesComponent,
    MoviesComponent,
    SessionComponent,
    MovieDetailsComponent,
    MovieListComponent,
    MovieListToolbarComponent,
    ReviewsComponent,
    AddMovieComponent,
    DirectorListComponent,
    DirectorsComponent,
    DirectorComponent,
    DirectorDetailsComponent,
    DirectorMoviesComponent,
    AddDirectorComponent,
    UpdateMovieComponent,
    UpdateDirectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule,
    MatSelectModule,
    MatIconModule,
  ], providers: [
    AuthorizationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
