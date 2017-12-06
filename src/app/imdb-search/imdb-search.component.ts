import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx'

import { ImdbService } from '../services/imdb.service';
import { SimpleMovie, ImdbResponse, DetailedMovie } from '../models/imdb';

@Component({
  selector: 'app-imdb-search',
  templateUrl: './imdb-search.component.html',
  styleUrls: ['./imdb-search.component.scss']
})
export class ImdbSearchComponent implements OnInit, OnDestroy {

  movies: SimpleMovie[];
  simpleSubscription$: Subscription;

  constructor(private imdbService: ImdbService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    this.simpleSubscription$ = this.imdbService.searchMovies('x-men')
      .subscribe((response: ImdbResponse) => {
        this.movies = response.Search;
      });
  }

  ngOnDestroy() {
    this.simpleSubscription$.unsubscribe();
  }

  search(movieName): void {
    this.simpleSubscription$.unsubscribe();

    this.simpleSubscription$ = this.imdbService.searchMovies(movieName).subscribe((response: ImdbResponse) => {
      this.movies = response.Search;
    });
  }

  showDetails(): boolean {
    console.log('showDetails: ', this.imdbService.detailsOpened)
    return this.imdbService.detailsOpened;
  }

  openTab(url): void {
    window.open(url, '_blank');
  }
}
