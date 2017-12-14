import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { ImdbService } from './imdb.service';
import { environment } from '../../environments/environment';
import { imdbResponseMock, simpleMovieMock, detailedMovieMock } from '../../mocks/movieMocks';
import { ImdbResponse, DetailedMovie } from '../models/imdb';

describe('ImdbService', () => {
  let service: ImdbService,
    httpMock: HttpTestingController,
    router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ImdbService]
    });

    router = TestBed.get(Router); 
    spyOn(router, 'navigate');
    service = TestBed.get(ImdbService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  describe('searchMovies()', () => {

    const query = 'someQuery';
    const compiledQuery = environment.OMDB_URI.replace('{searchString}', '&s=' + encodeURI(query));

    it('should return an ImdbResponse', () => {

      service.searchMovies(query).subscribe((response: ImdbResponse) => {
        expect(response.Search.length).toBe(1);
        expect(response.totalResults).toBe('1');
      });

      const req = httpMock.expectOne(compiledQuery);
      expect(req.request.method).toBe('GET');

      req.flush(imdbResponseMock);

      httpMock.verify();
    });
  });

  describe('getMovie()', () => {
    const imdbID = simpleMovieMock.imdbID;
    const compiledURL = environment.OMDB_URI.replace('{searchString}', '&i=' + encodeURI(imdbID))

    it('should set detailsOpen to true', () => {
      service.getMovie(simpleMovieMock.imdbID).subscribe();

      expect(service.detailsOpened).toBe(true);

      const req = httpMock.expectOne(compiledURL);

      req.flush(imdbResponseMock);

      httpMock.verify();
    });

    it('should return detailed movie', () => {
      service.getMovie(simpleMovieMock.imdbID).subscribe((movie: DetailedMovie) => {
        expect(movie).toBe(detailedMovieMock);
      });

      const req = httpMock.expectOne(compiledURL);
      expect(req.request.method).toBe('GET');

      req.flush(detailedMovieMock);

      httpMock.verify();
    });
  });

  describe('closeDetails()', () => {
    const routeMock = 'Fake Route';

    it('should set detailsOpened to false', () => {
      service.closeDetails(routeMock);

      expect(service.detailsOpened).toBe(false);
    });

    it('should call navigate with the router passed as param', () => {
      service.closeDetails(routeMock);
  
      expect(router.navigate).toHaveBeenCalledWith(['../'], {relativeTo: routeMock});
    });
  });
});