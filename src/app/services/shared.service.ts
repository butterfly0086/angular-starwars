import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Movie } from '../types/movie';
import { Character } from '../types/character';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor() { }

  private moviesSource = new BehaviorSubject<Movie[]>([]);
  movies$ = this.moviesSource.asObservable();

  private selectedCharacterSource = new BehaviorSubject<Character | null>(null);
  selectedCharacter$ = this.selectedCharacterSource.asObservable();

  private selectedMovieSource = new BehaviorSubject<Movie | null>(null);
  selectedMovie$ = this.selectedMovieSource.asObservable();

  updateMovies(movies: Movie[]): void {
    this.moviesSource.next([...movies]);
  };

  updateSelectedCharacter(character: Character | null) {
    this.selectedCharacterSource.next(character);
  }

  updateSelectedMovie(movie: Movie | null) {
    this.selectedMovieSource.next(movie);
  }
}
