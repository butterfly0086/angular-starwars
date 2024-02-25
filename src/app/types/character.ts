import { Movie } from './movie';

export class Character {
    id: number;
    url: string;
    name: string;
    gender: string;
    height: number;
    gender_abrv: string;
    birth_year: string;
    films: Movie[];

    constructor(
        id: number,
        url: string,
        name: string,
        gender: string,
        height: number,
        icon: string,
        birth_year: string,
        films: Movie[],
    ) {
        this.id = id;
        this.url = url;
        this.name = name;
        this.gender = gender;
        this.height = height;
        this.gender_abrv = icon;
        this.birth_year = birth_year;
        this.films = films;
    }
}
