import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { SavedMovieListComponent } from './saved-movie-list.component';

import { ImdbService } from '../services/imdb.service';
import { FirebaseService } from '../services/firebase.service';
import { simpleMovieMock, imdbResponseMock } from '../../mocks/movieMocks';
import { JitCompiler } from '@angular/compiler/src/jit/compiler';

describe('SavedMovieListComponent', () => {
  let component: SavedMovieListComponent,
  fixture: ComponentFixture<SavedMovieListComponent>,
  imdbService: jasmine.SpyObj<ImdbService>,
  firebaseService: jasmine.SpyObj<FirebaseService>;

  beforeEach(async(() => {
    firebaseService = jasmine.createSpyObj<FirebaseService>('FirebaseService', ['getSavedMovies', 'saveMovie', 'removeMovie', 'isSaved']);
    firebaseService.getSavedMovies.and.returnValue(Observable.of([simpleMovieMock]));
    firebaseService.removeMovie.and.returnValue(true);

    imdbService = jasmine.createSpyObj<ImdbService>('ImdbService', ['searchMovies', 'closeDetails', 'detailsOpened']);
    imdbService.searchMovies.and.returnValue(Observable.of(imdbResponseMock));

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SavedMovieListComponent],
      providers: [
        { provide: ImdbService, useValue: imdbService },
        { provide: FirebaseService, useValue: firebaseService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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

  it('should set movies using saved movies', () => {
    expect(component.movies[0]).toBe(simpleMovieMock);
  })

  describe('showDetails()', () => {

    it('should call imdbService.detailsOpened', () => {
      let result = component.showDetails();

      expect(result).toBe(false);
    })
  })

  describe('deleteMovie()', () => {
  
    it('should pass movie to firebaseService.removeMovie', () => {
      component.deleteMovie(simpleMovieMock);

      expect(firebaseService.removeMovie).toHaveBeenCalledWith(simpleMovieMock);
    })
  })
});
