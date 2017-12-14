import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { MovieDetailsComponent } from './movie-details.component';

import { ImdbService } from '../services/imdb.service';
import { FirebaseService } from '../services/firebase.service';
import { detailedMovieMock, imdbResponseMock, simpleMovieMock } from '../../mocks/movieMocks';
import { detachEmbeddedView } from '@angular/core/src/view/view_attach';

describe('MovieDetailsComponent', () => {
    let component: MovieDetailsComponent,
        fixture: ComponentFixture<MovieDetailsComponent>,
        imdbService: jasmine.SpyObj<ImdbService>,
        firebaseService: jasmine.SpyObj<FirebaseService>;

    let activatedRoute = {
        snapshot: {
            params: {
                'id': '2222'
            }
        }
    }

    beforeEach(async(() => {
        firebaseService = jasmine.createSpyObj<FirebaseService>('FirebaseService', ['getSavedMovies', 'saveMovie', 'removeMovie', 'isSaved']);
        firebaseService.getSavedMovies.and.returnValue(Observable.of({}));
        firebaseService.isSaved.and.returnValue(true);

        imdbService = jasmine.createSpyObj<ImdbService>('ImdbService', ['searchMovies', 'closeDetails', 'detailsOpened', 'getMovie']);
        imdbService.getMovie.and.returnValue(Observable.of(detailedMovieMock));

        spyOn(window, 'open');

        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [MovieDetailsComponent],
            providers: [
                { provide: ImdbService, useValue: imdbService },
                { provide: FirebaseService, useValue: firebaseService },
                { provide: ActivatedRoute, useValue: activatedRoute }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MovieDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call openDetails with the id in params', () => {
        spyOn(component, 'openDetails');
        component.ngOnInit();
        expect(component.openDetails).toHaveBeenCalledWith(activatedRoute.snapshot.params.id);
    })

    describe('saveMovie()', () => {

        it('should pass simplified movie to firebaseService.saveMovie', () => {
            component.saveMovie(detailedMovieMock);

            expect(firebaseService.saveMovie).toHaveBeenCalledWith(simpleMovieMock);
        })
    })

    describe('removeMovie()', () => {

        it('should pass simplified movie to firebaseService.removeMovie', () => {
            component.removeMovie(detailedMovieMock);

            expect(firebaseService.removeMovie).toHaveBeenCalledWith(simpleMovieMock);
        })
    });

    describe('openTab()', () => {
        const urlMock = 'http://google.com';
        it('should call window.open', () => {
            component.openTab(urlMock);

            expect(window.open).toHaveBeenCalledWith(urlMock, '_blank');
        })
    })

    describe('openDetails()', () => {
        beforeEach(() => {
            component.openDetails(activatedRoute.snapshot.params.id);
        })

        it('should call imdbService.getMovie with id', () => {
            expect(imdbService.getMovie).toHaveBeenCalledWith(activatedRoute.snapshot.params.id);
        })

        it('should assign the result of getMovie() to detailedMovie', () => {
            expect(component.detailedMovie).toBe(detailedMovieMock);
        })
    })

    describe('closeDetails()', () => {

        it('should call imdbService.closeDetails with the route', () => {
            component.closeDetails();

            expect(imdbService.closeDetails).toHaveBeenCalledWith(activatedRoute);
        })
    })

    describe('isSaved()', () => {
        const imdbIDMock = 'ttewewe'
        let result: boolean;
        beforeEach(() => {
            result = component.isSaved(imdbIDMock)
        })
        it('should call firebaseService.isSaved with id', () => {
            expect(firebaseService.isSaved).toHaveBeenCalledWith(imdbIDMock);
        })

        it('should return a boolean value from firebaseService.isSaved', () => {
            expect(result).toBe(true);
        })
    })
});
