import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedMovieListComponent } from './saved-movie-list.component';

describe('SavedMovieListComponent', () => {
  let component: SavedMovieListComponent;
  let fixture: ComponentFixture<SavedMovieListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedMovieListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedMovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
