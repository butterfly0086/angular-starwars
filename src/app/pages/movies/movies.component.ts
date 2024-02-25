import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { Movie } from '../../types/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  animations: [
    trigger('slideUpDown', [
      state('in', style({ height: '*' })),
      transition('* => void', [
        style({ height: '*' }),
        animate('300ms', style({ height: 0 }))
      ]),
      transition('void => *', [
        style({ height: 0 }),
        animate('300ms', style({ height: '*' }))
      ]),
    ]),
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('400ms ease-in-out', style({ transform: 'translateY(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class MoviesComponent {
  movies: Movie[] = [];
  errorMessage: string | null = '';
  loading: boolean = false;
  searchValue = '';

  private searchTerms = new Subject<string>();
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private movieService: MoviesService,
  ) {
    this.movieService.movie$.pipe(takeUntil(this.destroy$)).subscribe((movies) => this.movies = this.sortMovies(movies));
    this.movieService.error$.pipe(takeUntil(this.destroy$)).subscribe((err) => this.errorMessage = err);
    this.movieService.loader$.pipe(takeUntil(this.destroy$)).subscribe((loading) => {
      this.loading = loading;
    });

    this.searchTerms.pipe(
      debounceTime(2000),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.movieService.getMovies(this.searchValue);
    });
  };

  sortMovies(movies: Movie[]) {
    return movies.slice().sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
  };

  onSearchChange() {
    this.searchTerms.next(this.searchValue);
  }

  removeSearchValue() {
    this.searchValue = '';

    this.onSearchChange();
  }

  ngOnDestory(): void {
    this.destroy$.next();
    this.destroy$.complete();
  };
}
