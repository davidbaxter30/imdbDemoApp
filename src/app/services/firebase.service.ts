import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { SimpleMovie } from '../models/imdb';

@Injectable()
export class FirebaseService {

  movieCollection: AngularFirestoreCollection<SimpleMovie>;
  movies: Observable<SimpleMovie[]>;

  constructor(db: AngularFirestore) {  
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

  saveMovie(movie): void {
    this.movieCollection.add(movie);
  }

  removeMovie(movie): void {
    console.log('movie: ', movie)
    this.movieCollection.doc(movie.id).delete();
  }
}
