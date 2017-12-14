import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { SimpleMovie } from '../models/imdb';

import { FirebaseService } from './firebase.service';
import { simpleMovieMock } from '../../mocks/movieMocks';

describe('FirebaseService', () => {
  let service: FirebaseService,
  matSnackBar: jasmine.SpyObj<MatSnackBar>,
  db: jasmine.SpyObj<AngularFirestore>,
  movieCollection: jasmine.SpyObj<AngularFirestoreCollection<SimpleMovie>>,
  doc: jasmine.SpyObj<AngularFirestoreDocument<{}>>;

  beforeEach(() => {
    const actionMock = {
      doc: {
        data: () => simpleMovieMock,
        id: 'actionID'
      }
    };

    const actionsMock = [{
      type: 'added',
      payload: actionMock
    }];

    matSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    doc = jasmine.createSpyObj('AngularFirestoreDocument',['delete']);
    doc.delete.and.returnValue(Promise.resolve());

    movieCollection = jasmine.createSpyObj('AngularFirestoreCollection', ['snapshotChanges', 'add', 'doc'])
    movieCollection.snapshotChanges.and.returnValue(Observable.of(actionsMock))
    movieCollection.doc.and.returnValue(doc);
    movieCollection.add.and.returnValue(Promise.resolve());

    db = jasmine.createSpyObj('AngularFirestore', ['collection', ])
    db.collection.and.returnValue(movieCollection)

    TestBed.configureTestingModule({
      providers: [
        FirebaseService,
        { provide: AngularFirestore, useValue: db },
        { provide: MatSnackBar, useValue: matSnackBar}
      ]
    });

    service = TestBed.get(FirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  })

  it('should create movie collection', () => {
    expect(service.movieCollection).toBe(movieCollection);
  })

  it('should setup saved Movies observable', () => {
    expect(service.savedMovies$).toBeDefined();
  })

  describe('isSaved()', () => {
    it('should return true if the there is a movie with the ImdbID in the savedList', () => {
      service.savedMovies$.subscribe();
      const result = service.isSaved(simpleMovieMock.imdbID);

      expect(result).toBe(true);
    })
  });

  describe('getSavedMovies()', () => {
  
    it('should return the savedMovies$ observable', () => {
      const result = service.getSavedMovies();

      expect(result).toBe(service.savedMovies$)
    })
  })

  describe('saveMovie()', () => {
    it('should pass the movie to movieCollection.add', () => {
      service.saveMovie(simpleMovieMock);

      expect(movieCollection.add).toHaveBeenCalledWith(simpleMovieMock)
    });
  });

  describe('removeMovie()', () => {
  
    it('should find movie with matching ID from the savelist then pass to movieCollection.doc', () => {
      service.savedMovies$.subscribe();
      service.removeMovie(simpleMovieMock);

      expect(movieCollection.doc).toHaveBeenCalledWith('actionID');
      expect(doc.delete).toHaveBeenCalled();
    });
  })
});
