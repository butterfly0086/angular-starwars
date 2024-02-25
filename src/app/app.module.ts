import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Angular Materail
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MoviesComponent } from './pages/movies/movies.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { CharacterDetailComponent } from './pages/character-detail/character-detail.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieCardComponent,
    MovieDetailComponent,
    CharacterDetailComponent,
    LoadingComponent,
    CharacterCardComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
