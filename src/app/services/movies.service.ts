import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { UtilitiesService } from './utilities.service';
import { CharactersService } from './characters.service';
import { SharedService } from './shared.service';
import { Movie } from '../types/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private baseUrl = 'https://swapi.dev/api/';

  private moviesSource = new BehaviorSubject<Movie[]>([]);
  movie$ = this.moviesSource.asObservable();

  private selectedMovieSource = new BehaviorSubject<Movie | null>(null);
  selectedMovie$ = this.selectedMovieSource.asObservable();

  private errorSource = new BehaviorSubject<string | null>(null);
  error$ = this.errorSource.asObservable();

  private loaderSource = new BehaviorSubject<boolean>(false);
  loader$ = this.loaderSource.asObservable();

  constructor(
    private http: HttpClient,
    private util: UtilitiesService,
    private charaterService: CharactersService,
    private sharedService: SharedService,
  ) { }

  getMovies(search: string): void {
    this.updateLoader(true);
    this.getMoviesApi(search).subscribe({
      next: (res: any) => {
        this.extractMovieData(res.results);
        this.updateError(null);
      },
      error: (error: HttpErrorResponse) => {
        this.updateError(error.message);
        this.updateMovies([]);
        this.updateLoader(false);
      },
      complete: () => this.updateLoader(false),
    });
  };

  getMovieDetail(id: number) {
    this.updateLoader(true);
    this.updateSelectedMovie(null);

    this.getMovieDetailApi(id).subscribe({
      next: (res: any) => {
        this.charaterService.processEachCharacter(res.characters).then((characters) => {
          this.updateSelectedMovie({ ...res, characters });
          this.updateError(null);
        }).catch((error) => {
          this.updateError(error.message);
        });
      },
      error: (error: HttpErrorResponse) => {
        this.updateError(error.message);
      },
      complete: () => this.updateLoader(false),
    });
  };

  private getMoviesApi(search: string): Observable<any> {
    const path = `${this.baseUrl}films/?search=${search}`;
  
    return this.http.get<Response>(path).pipe(
      retry(3),
      catchError(this.util.handleError),
    );
  };

  private getMovieDetailApi(id: number): Observable<any> {
    const path = `${this.baseUrl}films/${id}`;

    return this.http.get<Response>(path).pipe(
      retry(3),
      catchError(this.util.handleError),
    );
  };

  private extractMovieData(result: any[]): void {
    let movieData: any = result.map((movie) => new Movie(
      movie.title,
      movie.episode_id,
      movie.opening_crawl,
      movie.producer,
      movie.director,
      movie.release_date,
      movie.characters,
      movie.url,
    ));
    
    this.sharedService.updateMovies(movieData);
    this.updateMovies(movieData);
  };

  private updateMovies(movies: Movie[]): void {
    this.moviesSource.next([...movies]);
  };

  private updateSelectedMovie(movie: Movie | null) {
    this.selectedMovieSource.next(movie);
  };

  private updateError(message: string | null): void {
    this.errorSource.next(message);
    console.log('Error message', message);
  };

  private updateLoader(state: boolean): void {
    this.loaderSource.next(state);
    console.log('Loader state:', state);
  };
}
