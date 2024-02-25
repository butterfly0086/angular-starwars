import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoviesComponent } from './pages/movies/movies.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { CharacterDetailComponent } from './pages/character-detail/character-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full',
  },
  {
    path: 'movies',
    component: MoviesComponent,
  },
  {
    path: 'movies/:id/view',
    component: MovieDetailComponent,
  },
  {
    path: 'character/:id/view',
    component: CharacterDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
