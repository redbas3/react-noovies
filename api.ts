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
}

interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[]
}

export const moviesApi = { 
  trending: () => fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then((res) => res.json()),
  upcoming: () => fetch(`${BASE_URL}/movie/upcoming?language=ko-Kr&page=1&region=KR&api_key=${API_KEY}`).then((res) => res.json()),
  nowPlaying: () => 
fetch(`${BASE_URL}/movie/now_playing?language=ko-Kr&page=1&region=KR&api_key=${API_KEY}`).then((res) => res.json()) 
};

export const tvApi = { 
  trending: () => fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`).then((res) => res.json()),
  airingToday: () => fetch(`${BASE_URL}/tv/airing_today?language=ko-Kr&page=1&region=KR&api_key=${API_KEY}`).then((res) => res.json()),
  topRated: () => fetch(`${BASE_URL}/tv/top_rated?language=ko-Kr&page=1&region=KR&api_key=${API_KEY}`).then((res) => res.json()),
};
