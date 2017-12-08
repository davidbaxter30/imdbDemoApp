import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ImdbService } from '../services/imdb.service';
import { FirebaseService } from '../services/firebase.service';
import { DetailedMovie } from '../models/imdb';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {

  detailSubscription$: Subscription;
  detailedMovie: DetailedMovie;

  constructor(private imdbService: ImdbService, private firebaseService: FirebaseService, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.openDetails(this.route.snapshot.params['id']);
  }

  ngOnDestroy() {
    this.detailSubscription$.unsubscribe();
  }

  saveMovie(movie: DetailedMovie): void {
    let simpleMovie = {
      'Title': movie.Title,
      'Poster': movie.Poster,
      'Year': movie.Year,
      'imdbID': movie.imdbID
    }
    this.firebaseService.saveMovie(simpleMovie);
  } 

  removeMovie(movie: DetailedMovie): void {
    let simpleMovie = {
      'Title': movie.Title,
      'Poster': movie.Poster,
      'Year': movie.Year,
      'imdbID': movie.imdbID
    }
    this.firebaseService.removeMovie(simpleMovie);
  }

  openTab(url): void {
    window.open(url, '_blank');
  }

  openDetails(id) {
    this.detailSubscription$ = this.imdbService.getMovie(id)
      .subscribe(detailedMovie => {
        this.detailedMovie = detailedMovie;
      });
  }

  closeDetails() {
    this.imdbService.closeDetails(this.route);
  }

  isSaved(imdbID: string): boolean {
    return this.firebaseService.isSaved(imdbID);
  }
}
