import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MovieListToolbarComponent} from './movie-list-toolbar.component';

describe('MovieListToolbarComponent', () => {
  let component: MovieListToolbarComponent;
  let fixture: ComponentFixture<MovieListToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieListToolbarComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MovieListToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
