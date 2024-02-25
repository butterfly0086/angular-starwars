import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { UtilitiesService } from './utilities.service';
import { Character } from '../types/character';
import { Movie } from '../types/movie';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private baseUrl = 'https://swapi.dev/api/people/';

  characters: Character[] = [];
  movies: Movie[] | null = null;
 
  public charactersSource = new BehaviorSubject<Character[]>([]);
  characters$ = this.charactersSource.asObservable();

  public selectedCharacterSource = new BehaviorSubject<Character | null>(null);
  selectedCharacter$ = this.selectedCharacterSource.asObservable();

  private errorSource = new BehaviorSubject<string | null>(null);
  error$ = this.errorSource.asObservable();

  private loaderSource = new BehaviorSubject<boolean>(false);
  loader$ = this.loaderSource.asObservable();

  constructor(
    private http: HttpClient,
    private util: UtilitiesService,
  ) { }

  async processEachCharacter(characterPaths: string[]) {
    this.updateCharacters([]);
    this.updateLoader(true);
    this.characters = [];

    try {
      for (const path of characterPaths) {
  
        let url = new URL(path);
        let id = url.pathname.split('/').filter(Boolean).pop();
  
        await this.getCharactersData(Number(id));
      }
  
      return this.characters;
    } catch(error) {
      console.error('Error fetching character data:', error);

      return [];
    }
  }

  getCharactersData(id: number): void {
    this.updateLoader(true);
    this.updateSelecedCharacter(null);
    this.getCharacters(`${this.baseUrl}${id}`).subscribe({
      next: (res) => {
        this.extractCharacterData(res, id);
        this.updateError(null);
      },
      error: (error: HttpErrorResponse) => {
        this.updateError(error.message);
        this.updateLoader(false);
        this.updateCharacters([]);
      }
    });
  }

  private getCharacters(path: any): Observable<any> {
    return this.http.get<Response>(path).pipe(
      retry(3),
      catchError(this.util.handleError)
    );
  }

  private getMoviesSource(path: any) {
    return this.http.get<Response>(path).pipe(
      retry(3),
      catchError(this.util.handleError),
    );
  }

  private async extractCharacterData(result: any, id: number) {
    let characterData: any = {};
    let icon: string = '';

    switch (result.gender) {
      case 'male': icon = 'M'
        break;
      case 'female': icon = 'F'
        break;
      case 'hermaphrodite': icon = 'H'
        break;
      default: icon = 'n/a'
        break;
    }

    if (result.height === 'unknown') result.height = '0';

    characterData = new Character(id, result.url, result.name, result.gender, Number(result.height), icon, result.birth_year, result.films);

    this.characters.push(characterData);

    this.updateSelecedCharacter(characterData);
    this.updateCharacters(this.characters);
    this.updateLoader(false);
    this.updateError(null);
  }

  private updateCharacters(characters: Character[]) {
    this.charactersSource.next(characters);
  };

  private updateSelecedCharacter(character: Character | null) {
    this.selectedCharacterSource.next(character);
  };

  private updateError(message: string | null): void {
    this.errorSource.next(message);
  };

  private updateLoader(state: boolean): void {
    this.loaderSource.next(state);
  };
}
