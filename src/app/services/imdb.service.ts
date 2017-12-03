import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const OMDBURI: string  = 'http://www.omdbapi.com/?apikey=7cd9c016&s={searchString}'

export interface Movie {
  Poster: string;
  Title: string;
  Year: string;
  imdbID: string;
}

export interface ImdbResponse {
  Response: boolean;
  Search: Movie[];
  totalResults: string;
}

@Injectable()
export class ImdbService {

  searchQuery: string;

  constructor( private http: HttpClient ) {
  }

  searchMovies(query): Observable<any[]> {
    return this.http.get<any[]>(OMDBURI.replace('{searchString}', encodeURI(query)))
  }

};
