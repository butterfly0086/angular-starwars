import { Character } from './character';

export class Movie {
    title: string;
    episode_id: number;
    opening_crawl: string;
    producer: string;
    director: string;
    release_date: string;
    characters: Character[];
    banner: string;
    url: string;

    constructor (
        title: string,
        episode_id: number,
        opening_crawl: string,
        producer: string,
        director: string,
        release_date: string,
        characters: Character[],
        url: string,
    ) {
        this.title = title;
        this.episode_id = episode_id;
        this.opening_crawl = opening_crawl;
        this.producer = producer;
        this.director = director;
        this.release_date = release_date;
        this.characters = characters;
        this.banner = `../../../assets/images/cover/${episode_id}.png`;
        this.url = url;
    }
}
