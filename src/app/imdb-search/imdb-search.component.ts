import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ImdbService } from '../services/imdb.service';
import { FirebaseService } from '../services/firebase.service';
import { SimpleMovie, ImdbResponse, DetailedMovie } from '../models/imdb';

@Component({
  selector: 'app-imdb-search',
  templateUrl: './imdb-search.component.html',
  styleUrls: ['./imdb-search.component.scss']
})
export class ImdbSearchComponent implements OnInit, OnDestroy {

  movies: SimpleMovie[];
  simpleSubscription$: Subscription;

  constructor(private imdbService: ImdbService, private firebaseService: FirebaseService ,private route: ActivatedRoute) { }

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
    if (this.imdbService.detailsOpened) {
      this.imdbService.closeDetails();
    }
    this.simpleSubscription$.unsubscribe();

    this.simpleSubscription$ = this.imdbService.searchMovies(movieName).subscribe((response: ImdbResponse) => {
      this.movies = response.Search;
    });
  }

  showDetails(): boolean {
    return this.imdbService.detailsOpened;
  }

  openTab(url): void {
    window.open(url, '_blank');
  }

  saveMovie(movie: SimpleMovie): void {
    this.firebaseService.saveMovie(movie);
  } 
}
