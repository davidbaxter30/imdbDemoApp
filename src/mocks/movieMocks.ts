import { SimpleMovie, DetailedMovie, ImdbResponse } from "../app/models/imdb";

export const simpleMovieMock: SimpleMovie = {
    Title: 'MovieTitle',
    Year: '1999',
    Poster: 'someUrl',
    imdbID: 'tteieiei'
}

export const detailedMovieMock: DetailedMovie = {
    ...simpleMovieMock,
    Released: '1998',
    Genre: 'SciFi',
    Rated: 'R',
    Runtime: '4 min',
    Director: 'Baxter',
    Writer: 'Baxter as well',
    Actors: 'Brad Pitt',
    Plot: 'Blah blah blah',
    Language: 'Eng',
    Country: 'USA',
    Awards: 'Some Awards',
    Ratings: [
        {
            Value: '5/10',
            Source: 'Rotten tomatoes'
        }
    ],
    Metascore: '50%',
    imdbRating: '52%',
    imdbVotes: '2020',
    Type: 'movie',
    DVD: 'no',
    BoxOffice: 'Mirrormax',
    Production: 'derp',
    Website: 'http://website.com',
    Response: 'ok'
}

export const imdbResponse: ImdbResponse = {
    Response: true,
    Search: [simpleMovieMock],
    totalResults: '1'
  }