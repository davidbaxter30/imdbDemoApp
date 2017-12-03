import { Component, OnInit } from '@angular/core';

import { ImdbService, Movie, ImdbResponse} from '../services/imdb.service';

@Component({
  selector: 'app-imdb-search',
  templateUrl: './imdb-search.component.html',
  styleUrls: ['./imdb-search.component.css']
})
export class ImdbSearchComponent implements OnInit {

  movies: Movie[];


  constructor(private imdb: ImdbService) { }

  ngOnInit() {
    this.imdb.searchMovies('x-men').subscribe((response: any) => {
      this.movies = response.Search;
    })
  }

}
