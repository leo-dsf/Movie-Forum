import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group({
      query: ['']
    });
  }

  onSubmit() {
    this.router.navigate(['movielist/search/' + this.searchForm.value.query]);
  }
}

