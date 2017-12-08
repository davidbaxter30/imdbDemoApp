import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import { SimpleMovie } from '../models/imdb';

@Injectable()
export class FirebaseService {

  movieCollection: AngularFirestoreCollection<SimpleMovie>;
  savedMovies$: Observable<any[]>;
  savedList: any[];

  constructor(db: AngularFirestore, private snackbar: MatSnackBar) {  
    this.movieCollection = db.collection<SimpleMovie>('movies');
    this.savedMovies$ = this.movieCollection.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as SimpleMovie;
        const id = action.payload.doc.id;
        return { id, ...data };
      })
    })
    .map( savedMovies => this.savedList = savedMovies );
  };

  isSaved(imdbID: string): boolean {
    if ( this.savedList ) {
      return this.savedList.find((item) => item.imdbID === imdbID) !== undefined;
    } else {
      return false;
    }
  }

  getSavedMovies(): Observable<any[]> {
    return this.savedMovies$;
  }

  saveMovie( movie: SimpleMovie ): void {
    this.movieCollection.add(movie)
    .then(() => {
      this.openSnackbar(movie, 'Saved')
    })
    .catch(err => {
      console.log(err);
    });
  }

  removeMovie(movie: SimpleMovie): void {
    let movieWithId = this.savedList.find( savedMovie => savedMovie.imdbID === movie.imdbID );
    this.movieCollection.doc(movieWithId.id).delete()
    .then(() => {
      this.openSnackbar(movie, 'Removed')
    })
    .catch(err => {
      console.log(err);
    });
    
  }

  private openSnackbar(movie: any, action: string) {
    this.snackbar.open(`${movie.Title} has been ${action}!`, '', {
      duration: 3000
    });
  }
}
