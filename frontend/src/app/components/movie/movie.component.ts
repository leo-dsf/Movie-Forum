import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {

  @Input() image_url: string | undefined;
  @Input() rating: number | undefined;
  @Input() title: string | undefined;
  @Input() id: number | undefined;

  constructor() {
  }

  ngOnInit() {
    //console.log(this.service.getMovie(13));

  }

}
