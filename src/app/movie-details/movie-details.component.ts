import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { DetailedMovie } from '../models/imdb';
import { ImdbService } from '../services/imdb.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {

  detailSubscription$: Subscription;
  detailedMovie: DetailedMovie;

  constructor(private imdbService: ImdbService, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.openDetails(this.route.snapshot.params['id']);
  }

  ngOnDestroy() {
    this.detailSubscription$.unsubscribe();
  }

  getPoster(posterUrl: string): string {
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

  openTab(url): void {
    window.open(url, '_blank');
  }

  openDetails(id) {
    this.detailSubscription$ = this.imdbService.getMovie(id)
      .subscribe(detailedMovie => {
        this.detailedMovie = detailedMovie;
      });
  }
}
