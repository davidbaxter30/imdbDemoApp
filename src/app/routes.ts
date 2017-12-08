import { Routes } from '@angular/router';

import { ImdbSearchComponent } from './imdb-search/imdb-search.component';
import { SavedMovieListComponent } from './saved-movie-list/saved-movie-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

export const appRoutes: Routes = [
    {
        path: '', 
        redirectTo: 'search',
        pathMatch: 'full'
    },
    {
        path: 'saved', 
        component: SavedMovieListComponent,
        children: [
            {
                path: 'details/:id',
                component: MovieDetailsComponent,
                outlet: 'savedMovieDetails'
            }
        ]
    },
    { 
        path: 'search',
        component: ImdbSearchComponent,
        children: [
            {
                path: 'details/:id',
                component: MovieDetailsComponent,
                outlet: 'movieDetails'
            }
        ]
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
]