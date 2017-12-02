import { RouterModule, Routes } from '@angular/router';

export const appRoutes: Routes = [
    {
        path: '', 
        redirectTo: '/search'
    },
    { 
        path: 'search',
        component: imdbSearch
    },
    {
        path: 'search/:name',
        component: imdbSearch
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