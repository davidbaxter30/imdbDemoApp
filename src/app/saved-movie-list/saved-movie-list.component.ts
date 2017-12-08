import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { FirebaseService } from '../services/firebase.service';
import { ImdbService } from '../services/imdb.service';

@Component({
  selector: 'app-saved-movie-list',
  templateUrl: './saved-movie-list.component.html',
  styleUrls: ['./saved-movie-list.component.scss']
})
export class SavedMovieListComponent implements OnInit, OnDestroy {

  movies: any[];
  savedMovies$: Subscription;

  constructor(private firebaseService: FirebaseService, private imdbService: ImdbService) { }

  ngOnInit() {
    if (this.imdbService.detailsOpened) {
      this.imdbService.detailsOpened = false;
    }

    this.savedMovies$ = this.firebaseService.getSavedMovies()
    .subscribe(savedMovies => this.movies = savedMovies);
  }

  ngOnDestroy() {
    this.savedMovies$.unsubscribe()
  }

  showDetails(): boolean {
    return this.imdbService.detailsOpened;
  }

  deleteMovie(movie): void {
    this.firebaseService.removeMovie(movie);
  }
}
