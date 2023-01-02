import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DirectorMoviesComponent} from './director-movies.component';

describe('DirectorMoviesComponent', () => {
  let component: DirectorMoviesComponent;
  let fixture: ComponentFixture<DirectorMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DirectorMoviesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DirectorMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
