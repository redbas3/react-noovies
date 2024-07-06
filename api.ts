import { QueryFunction } from "react-query";

const API_KEY = "0982b256ea73339e86ad4ea71063ef1f";
const BASE_URL = "https://api.themoviedb.org/3";

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  media_type: string;
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  imdb_id: string;
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: object;
  budget: number;
  genres: object;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: object;
  production_countries: object;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: object;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: {
    results: {
      name: string;
      key: string;
      site: string;
    }[];
  };
  images: object;
}

export interface TV {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  title: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  media_type: string;
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  homepage: string;
}

export interface TVDetails {
  backdrop_path: string;
  created_by: object;
  episode_run_time: object;
  first_air_date: string;
  genres: object;
  homepage: string;
  id: number;
  in_production: boolean;
  languages: object;
  last_air_date: string;
  last_episode_to_air: object;
  name: string;
  next_episode_to_air: object;
  networks: object;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: object;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: object;
  production_countries: object;
  seasons: object;
  spoken_languages: object;
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  videos: {
    results: {
      name: string;
      key: string;
      site: string;
    }[];
  };
  images: object;
}

interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

export interface TVResponse extends BaseResponse {
  results: TV[];
}

type MovieListResponse = QueryFunction<MovieResponse>;
type TVListResponse = QueryFunction<TVResponse>;

interface MovieFetchers {
  trending: MovieListResponse;
  upcoming: MovieListResponse;
  nowPlaying: MovieListResponse;
  search: MovieListResponse;
  detail: QueryFunction<MovieDetails>;
}

interface TVFetchers {
  trending: TVListResponse;
  airingToday: TVListResponse;
  topRated: TVListResponse;
  search: TVListResponse;
  detail: QueryFunction<TVDetails>;
}

export const moviesApi: MovieFetchers = {
  trending: ({ pageParam }) =>
    fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${
        pageParam ?? 1
      }`
    ).then((res) => res.json()),
  upcoming: ({ pageParam }) =>
    fetch(`${BASE_URL}/movie/upcoming?page=1&api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  nowPlaying: () =>
    fetch(
      `${BASE_URL}/movie/now_playing?language=ko-Kr&page=1&region=KR&api_key=${API_KEY}`
    ).then((res) => res.json()),

  search: ({ queryKey }: any) => {
    const [_, query] = queryKey;
    return fetch(
      `${BASE_URL}/search/movie?language=ko-Kr&page=1&region=KR&api_key=${API_KEY}&query=${query}`
    ).then((res) => res.json());
  },
  detail: ({ queryKey }: any) => {
    const [_, id] = queryKey;
    return fetch(
      `${BASE_URL}/movie/${id}?&api_key=${API_KEY}&append_to_response=videos,images`
    ).then((res) => res.json());
  },
};

export const tvApi = {
  trending: () =>
    fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  airingToday: () =>
    fetch(
      `${BASE_URL}/tv/airing_today?language=ko-Kr&page=1&region=KR&api_key=${API_KEY}`
    ).then((res) => res.json()),
  topRated: () =>
    fetch(
      `${BASE_URL}/tv/top_rated?language=ko-Kr&page=1&region=KR&api_key=${API_KEY}`
    ).then((res) => res.json()),
  search: ({ queryKey }: any) => {
    const [_, query] = queryKey;
    return fetch(
      `${BASE_URL}/search/tv?language=ko-Kr&page=1&region=KR&api_key=${API_KEY}&query=${query}`
    ).then((res) => res.json());
  },
  detail: ({ queryKey }: any) => {
    const [_, id] = queryKey;
    return fetch(
      `${BASE_URL}/tv/${id}?&api_key=${API_KEY}&append_to_response=videos,images`
    ).then((res) => res.json());
  },
};
