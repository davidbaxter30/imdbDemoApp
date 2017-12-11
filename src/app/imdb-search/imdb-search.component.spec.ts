import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ImdbSearchComponent } from './imdb-search.component';

import { ImdbService } from '../services/imdb.service';
import { FirebaseService } from '../services/firebase.service';
import { simpleMovieMock, imdbResponse } from '../../mocks/movieMocks';

describe('ImdbSearchComponent', () => {
  let component: ImdbSearchComponent,
    fixture: ComponentFixture<ImdbSearchComponent>,
    imdbService: jasmine.SpyObj<ImdbService>,
    firebaseService: jasmine.SpyObj<FirebaseService>,
    activatedRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async(() => {
    firebaseService = jasmine.createSpyObj<FirebaseService>('FirebaseService', ['getSavedMovies', 'saveMovie', 'removeMovie', 'isSaved']);
    firebaseService.getSavedMovies.and.returnValue(Observable.of({}));

    imdbService = jasmine.createSpyObj<ImdbService>('ImdbService', ['searchMovies', 'closeDetails', 'detailsOpened']);
    imdbService.searchMovies.and.returnValue(Observable.of(imdbResponse));

    activatedRoute = jasmine.createSpyObj<ActivatedRoute>('ActivatedRoute', ['getParams']);

    spyOn(window, 'open');

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ImdbSearchComponent],
      providers: [
        { provide: ImdbService, useValue: imdbService },
        { provide: FirebaseService, useValue: firebaseService },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImdbSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('search()', () => {
    const testString = 'testString';

    it('should call imdbService.searchMovies() with movieName', () => {
      let result = component.search(testString);

      expect(imdbService.searchMovies).toHaveBeenCalledWith(testString);
    })

    it('should assign search results to the movies property', () => {
      component.search(testString);

      expect(component.movies).toBe(imdbResponse.Search);
    })
  });

  describe('showDetails()', () => {

    it('should call imdbService.detailsOpened', () => {
      let result = component.showDetails();

      expect(result).toBe(imdbService.detailsOpened);
    })
  })

  describe('openTab()', () => {
    const urlMock = 'http://google.com';
    it('should call window.open', () => {
      component.openTab(urlMock);

      expect(window.open).toHaveBeenCalledWith(urlMock, '_blank');
    })
  })

  describe('saveMovie()', () => {

    it('should pass movie to firebaseService.saveMovie()', () => {
      component.saveMovie(simpleMovieMock);

      expect(firebaseService.saveMovie).toHaveBeenCalledWith(simpleMovieMock);
    })
  })

  describe('removeMovie()', () => {

    it('should pass movie to firebaseService.removeMovie()', () => {
      component.removeMovie(simpleMovieMock);

      expect(firebaseService.removeMovie).toHaveBeenCalledWith(simpleMovieMock);
    })
  })

  describe('isSaved()', () => {

    it('should pass imdbID to firebaseService.isSaved()', () => {
      component.isSaved(simpleMovieMock.imdbID);

      expect(firebaseService.isSaved).toHaveBeenCalledWith(simpleMovieMock.imdbID);
    })
  })
});
