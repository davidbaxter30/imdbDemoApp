import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FirebaseService } from '../services/firebase.service';
import { ImdbService } from '../services/imdb.service';

@Component({
  selector: 'app-saved-movie-list',
  templateUrl: './saved-movie-list.component.html',
  styleUrls: ['./saved-movie-list.component.scss']
})
export class SavedMovieListComponent implements OnInit {

  movies: Observable<any[]>

  constructor(private firebaseService: FirebaseService, private imdbService: ImdbService) { }

  ngOnInit() {
    // this.movies = this.firebaseService.getSavedMovies();
    if (this.imdbService.detailsOpened) {
      this.imdbService.closeDetails();
    }

    this.movies = this.firebaseService.getSavedMovies();
  }

  showDetails(): boolean {
    return this.imdbService.detailsOpened;
  }

  deleteMovie(movie): void {
    this.firebaseService.removeMovie(movie);
  }
}
