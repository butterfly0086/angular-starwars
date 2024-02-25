import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input() title: string | undefined;
  @Input() releaseDate: string | undefined;
  @Input() producer: string | undefined;
  @Input() movieId: number | undefined;

  constructor(private router: Router) { }

  navigateToMovieDetails(id: number | undefined) {
    this.router.navigate(['/movies', id, 'view']);
  };
}
