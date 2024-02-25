import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Movie } from '../../types/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
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
        animate('500ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('500ms ease-in-out', style({ transform: 'translateY(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class MovieDetailComponent {
  movie: Movie | null = null;
  errorMessage: string | null = '';
  loading: boolean = false;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private movieService: MoviesService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) {
    this.movieService.selectedMovie$.pipe(takeUntil(this.destroy$)).subscribe((movie) => this.movie = movie);
    this.movieService.error$.pipe(takeUntil(this.destroy$)).subscribe((err) => this.errorMessage = err);
    this.movieService.loader$.pipe(takeUntil(this.destroy$)).subscribe((loading) => this.loading = loading);
  };

  navigateToBack() {
    this.location.back();
  };
  
  navigateToCharacter(url: any) {
    url = new URL(url);
    const id = url.pathname.split('/').filter(Boolean).pop();
    this.router.navigate(['/character', id, 'view']);
  };
  
  ngOnInit() {
    this.route.params.subscribe(({ id }) => {
      this.movieService.getMovieDetail(id);
    });
  };
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  };
}
