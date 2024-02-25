import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Character } from '../../types/character';
import { Movie } from 'src/app/types/movie';
import { MoviesService } from '../../services/movies.service';
import { CharactersService } from '../../services/characters.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
  animations: [
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
export class CharacterDetailComponent {
  character: Character | null = null;
  movies: Movie[] = [];
  errorMessage: string | null = '';
  loading: boolean = false;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private charactersService: CharactersService,
    private movieService: MoviesService,
  ) {
    this.charactersService.selectedCharacter$.pipe(takeUntil(this.destroy$)).subscribe((character) => {
      this.character = character;
      if (!character) return;
      
      this.movieService.movie$.pipe(takeUntil(this.destroy$)).subscribe((movies: any[]) => {
        let films: any[] = [];
        
  
        for (const film of character.films) {
          let _film = movies.find((movie) => movie.url === film);

          if (_film) films = [ ...films, _film ];
        }
  
        this.character = { ...character, films };
      });
    });
    this.charactersService.error$.pipe(takeUntil(this.destroy$)).subscribe((err) => this.errorMessage = err);
    this.charactersService.loader$.pipe(takeUntil(this.destroy$)).subscribe((loading) => this.loading = loading);
  };

  navigateToBack() {
    this.location.back();
  };

  navigateToMovieDetail(id: number | undefined) {
    this.router.navigate(['/movies', id, 'view']);
  };

  ngOnInit() {
    this.route.params.subscribe(({ id }) => {
      this.charactersService.getCharactersData(id);
    });
  };

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  };
}
