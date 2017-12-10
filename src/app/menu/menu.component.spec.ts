import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Location } from "@angular/common";
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule, setupTestingRouter } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { MenuComponent } from './menu.component';
import { appRoutes } from '../routes';

import { ImdbSearchComponent } from '../imdb-search/imdb-search.component';
import { SavedMovieListComponent } from '../saved-movie-list/saved-movie-list.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

describe('MenuComponent', () => {
    let component: MenuComponent,
        fixture: ComponentFixture<MenuComponent>,
        router: Router,
        location: Location;

        
    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(appRoutes)],
            declarations: [
                MenuComponent,
                ImdbSearchComponent,
                SavedMovieListComponent,
                PageNotFoundComponent,
                MovieDetailsComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(async(() => {
        router = TestBed.get(Router); 
        location = TestBed.get(Location);
        router.navigate(['/search']);

        fixture = TestBed.createComponent(MenuComponent);
        router.initialNavigation();
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign second url segment to current path', fakeAsync(() => {
        expect(component.currentPath).toBe('search');
    }));

    describe('isActive()', () => {
    
      it('should return true for current path', fakeAsync(() => {
        let result = component.isActive('search');

        expect(result).toBeTruthy();
      }));
    });
});
