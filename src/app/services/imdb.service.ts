import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DetailedMovie, ImdbResponse, SimpleMovie } from '../models/imdb';

const OMDBURI: string  = 'http://www.omdbapi.com/?apikey=7cd9c016{searchString}'

@Injectable()
export class ImdbService {

  public detailsOpened: boolean;
  searchQuery: string;

  constructor( private http: HttpClient,
    private router: Router ) {
  }

  searchMovies(query): Observable<ImdbResponse> {
    return this.http.get<ImdbResponse>(OMDBURI.replace('{searchString}', '&s=' + encodeURI(query)))
      .map((response: ImdbResponse) => {
        response.Search
          .map((movie: SimpleMovie) => {
            movie.Poster = this.getPoster(movie.Poster);
            return movie;
          })
        return response;
      });
  }

  getMovie(imdbID): Observable<DetailedMovie> {
    this.detailsOpened = true;
    return this.http.get<DetailedMovie>(OMDBURI.replace('{searchString}', '&i=' + encodeURI(imdbID)))
      .map((movie: DetailedMovie) => {
        movie.Poster = this.getPoster(movie.Poster);
        return movie;
      });    
  }

  closeDetails(): void {
    this.detailsOpened = false;
    this.router.navigate(['search']);
  }

  private getPoster(posterUrl: string): string {
    return posterUrl !== 'N/A' ? posterUrl : this.getRandomFillerImage();
  }

  private getRandomFillerImage(): string {
    const fillerSites = [
      'https://www.placecage.com/300/400',
      'https://www.fillmurray.com/300/400',
      'http://www.stevensegallery.com/300/400'
    ];

    return fillerSites[Math.floor(Math.random() * 3)];
  }
};
