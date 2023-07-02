import React from "react";
import { InfiniteQueryObserverResult } from "react-query";
import { MovieResponse, TVResponse } from "./api";

type MovieFetch =Promise<InfiniteQueryObserverResult<MovieResponse, unknown>>;
type TVFetch =Promise<InfiniteQueryObserverResult<TVResponse, unknown>>

export type FetchNext = ()=>  TVFetch | MovieFetch

export const fetchMore = (hasNext:boolean | undefined,fetchNext:FetchNext) => hasNext ? fetchNext():null

export const makeImgPath = (img:string, width:string = "w500") => {
  return `https://image.tmdb.org/t/p/${width}${img}`
}
