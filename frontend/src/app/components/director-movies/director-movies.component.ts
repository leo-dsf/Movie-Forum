import {Component, Input} from '@angular/core';
import {Movie} from 'src/app/models/movie';

@Component({
  selector: 'app-director-movies',
  templateUrl: './director-movies.component.html',
  styleUrls: ['./director-movies.component.css']
})
export class DirectorMoviesComponent {

  @Input() movies: Movie[] | undefined;

  constructor() {

  }

  ngOnInit() {

  }


}
