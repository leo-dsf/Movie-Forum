import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddirectorComponent } from './adddirector.component';

describe('AdddirectorComponent', () => {
  let component: AdddirectorComponent;
  let fixture: ComponentFixture<AdddirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdddirectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdddirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
