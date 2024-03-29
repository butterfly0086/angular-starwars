import { Component } from '@angular/core';
import { MoviesService } from './services/movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'star-wars-movies';

  constructor(
    private movieService: MoviesService
  ) {}

  ngOnInit(): void {
    this.movieService.getMovies('');
  }
}
