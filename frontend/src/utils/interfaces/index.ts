/*
 * Interfaces & types that were used more than one time 
 * The interface of each component props can be found above the respective component 
 */


export interface IPoster {
    Poster: string
    _id: string
}
export interface IMovie {
    Title: string
    Year: string
    imdbID: string
    Type: string
    Poster?: IPoster
}

export interface IFetchResponse {
    movies: IMovie[]
}

export type alphaSort = 'A-Z' | 'Z-A';

export type yearSort = 'INCREASE' | 'DECREASE';

export type typeFilter = 'GAME' | 'MOVIE' | 'ALL';

export interface IFilter {
    titleSort?: alphaSort
    yearSort?: yearSort
    type: typeFilter
}

export interface IFilterOptions {
    ascendant: alphaSort,
    descendant: alphaSort,
    increase: yearSort,
    decrease: yearSort,
    movie: typeFilter,
    game: typeFilter,
    all: typeFilter
}