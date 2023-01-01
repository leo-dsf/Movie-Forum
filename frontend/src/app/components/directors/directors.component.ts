import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DirectorService } from 'src/app/services/directors/director.service';
import { DirectorComponent } from '../director/director.component';

@Component({
  selector: 'app-directors',
  templateUrl: './directors.component.html',
  styleUrls: ['./directors.component.css']
})
export class DirectorsComponent {
  directors: any;
  
  constructor(private service:DirectorService) {}

  ngOnInit() {
    //console.log(this.service.getMovie(13));
    this.service.getDirectors().subscribe(response => {
      this.directors = response;
      console.log(this.directors);
    })
  }
}
