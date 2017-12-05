import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DetailedMovie, ImdbResponse } from '../models/imdb';

const OMDBURI: string  = 'http://www.omdbapi.com/?apikey=7cd9c016{searchString}'

@Injectable()
export class ImdbService {

  searchQuery: string;

  constructor( private http: HttpClient ) {
  }

  searchMovies(query): Observable<ImdbResponse> {
    return this.http.get<ImdbResponse>(OMDBURI.replace('{searchString}', '&s=' + encodeURI(query)));
  }

  getMovie(imdbID): Observable<DetailedMovie> {
    return this.http.get<DetailedMovie>(OMDBURI.replace('{searchString}', '&i=' + encodeURI(imdbID)));    
  }

};
