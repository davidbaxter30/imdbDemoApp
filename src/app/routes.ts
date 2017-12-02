import { Routes } from '@angular/router';

import { ImdbSearchComponent } from './imdb-search/imdb-search.component';
import { SavedMovieListComponent } from './saved-movie-list/saved-movie-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const appRoutes: Routes = [
    {
        path: '', 
        redirectTo: 'search',
        pathMatch: 'full'
    },
    { 
        path: 'search',
        component: ImdbSearchComponent
    },
    {
        path: 'search/:name',
        component: ImdbSearchComponent
    },
    {
        path: 'saved', 
        component: SavedMovieListComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
]