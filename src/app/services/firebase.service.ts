import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { SimpleMovie } from '../models/imdb';

@Injectable()
export class FirebaseService {

  movieCollection: AngularFirestoreCollection<SimpleMovie>;
  movies: Observable<SimpleMovie[]>;

  constructor(db: AngularFirestore, private snackbar: MatSnackBar) {  
    this.movieCollection = db.collection<SimpleMovie>('movies');
    this.movies = this.movieCollection.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as SimpleMovie;
        const id = action.payload.doc.id;
        return { id, ...data };
      })
    })
  };

  getSavedMovies(): Observable<any[]> {
    return this.movies;
  }

  saveMovie( movie: SimpleMovie ): void {
    this.movieCollection.add(movie);
    this.snackbar.open(`${movie.Title} has been Saved!`,'', {
      duration: 3000
    })
  }

  removeMovie(movie): void {
    this.movieCollection.doc(movie.id).delete();
    this.snackbar.open(`${movie.Title} has been Removed!`,'', {
      duration: 3000
    })
  }
}
