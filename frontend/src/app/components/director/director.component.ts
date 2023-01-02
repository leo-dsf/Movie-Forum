import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent {
  @Input() image_url: string | undefined;
  @Input() name: string | undefined;


  constructor() {
  }

  ngOnInit() {
    //console.log(this.service.getMovie(13));

  }

}
