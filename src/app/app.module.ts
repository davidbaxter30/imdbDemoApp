// THIRD PARTY IMPORTS
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatInputModule, MatCardModule, MatButtonModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

// ENVIRONMENT SETUP
import { appRoutes } from './routes';
import { environment } from '../environments/environment';

// COMPONENTS
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { ImdbSearchComponent } from './imdb-search/imdb-search.component';
import { SavedMovieListComponent } from './saved-movie-list/saved-movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// SERVICES
import { FirebaseService } from './services/firebase.service';
import { ImdbService } from './services/imdb.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    ImdbSearchComponent,
    SavedMovieListComponent,
    PageNotFoundComponent,
    MovieDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [
    ImdbService,
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
