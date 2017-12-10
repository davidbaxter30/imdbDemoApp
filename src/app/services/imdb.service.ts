import { Injectable, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { DetailedMovie, ImdbResponse, SimpleMovie } from '../models/imdb';
import { environment } from '../../environments/environment';


@Injectable()
export class ImdbService {

  private _detailsOpened: boolean;
  searchQuery: string;

  get detailsOpened() {
    return this._detailsOpened;
  }
  set detailsOpened(value: boolean) {
    this._detailsOpened = value;
  }

  constructor( private http: HttpClient,
    private router: Router) {
  }

  searchMovies(query): Observable<ImdbResponse> {
    return this.http.get<ImdbResponse>(environment.OMDB_URI.replace('{searchString}', '&s=' + encodeURI(query)))
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
    this._detailsOpened = true;
    return this.http.get<DetailedMovie>(environment.OMDB_URI.replace('{searchString}', '&i=' + encodeURI(imdbID)))
      .map((movie: DetailedMovie) => {
        movie.Poster = this.getPoster(movie.Poster);
        return movie;
      });    
  }

  closeDetails(currentRoute): void {
    this._detailsOpened = false;
    this.router.navigate(['../'], {relativeTo: currentRoute});
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
