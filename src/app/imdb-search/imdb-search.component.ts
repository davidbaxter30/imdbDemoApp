import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

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
  showDetails: boolean;

  constructor(private imdbService: ImdbService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    this.simpleSubscription$ = this.imdbService.searchMovies('x-men')
      .subscribe((response: ImdbResponse) => {
        this.movies = response.Search;
      });

      // todo: create broadcast from details component to change showDetails to true when closed. 
    // if (this.route.snapshot.params['id']) {
    //   this.showDetails = true;
    // }
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

  getPoster(posterUrl: string): string {
    return posterUrl !== 'N/A' ? posterUrl : this.getRandomFillerImage();
  }

  openTab(url): void {
    window.open(url, '_blank');
  }

  private getRandomFillerImage(): string {
    const fillerSites = [
      'https://www.placecage.com/300/400',
      'https://www.fillmurray.com/300/400',
      'http://www.stevensegallery.com/300/400'
    ];

    return fillerSites[Math.floor(Math.random() * 3)];
  }
}
