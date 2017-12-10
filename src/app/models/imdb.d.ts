export interface SimpleMovie {
  Poster: string;
  Title: string;
  Year: string;
  imdbID: string;
}
  
export interface Rating {
  Source: string;
  Value: string;
}

export interface DetailedMovie extends SimpleMovie {
  Released: string;
  Genre: string;
  Rated: string;
  Runtime: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface ImdbResponse {
  Response: boolean;
  Search: SimpleMovie[];
  totalResults: string;
}