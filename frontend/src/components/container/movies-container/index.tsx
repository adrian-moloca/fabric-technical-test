import { FC, useMemo, useState } from "react";
import { IMovie, alphaSort, yearSort } from "../../../utils/interfaces";
import { Box, CircularProgress, Slide, Typography } from "@mui/material";
import MovieCard from "../../cards/movie-card";
import { Masonry } from "@mui/lab";
import { IFilter } from "../../../utils/interfaces";
import FilterBar from "./filter-bar";
import { filterOptions } from "../../../utils/costants";
interface IProps {
    movies: IMovie[] | string;
    loading: boolean;
}

const MoviesContainer: FC<IProps> = (props: IProps) => {
    
    const { movies, loading } = props;

    // filter/sort state  
    const [filter, setFilter] = useState<IFilter>({
        titleSort: filterOptions.ascendant, // if there is a titleSort selected the yearSort will be undefined & vice versa 
        type: filterOptions.all, // by default "ALL" is selected but the user can choose if they wants to se only the matrix movies also the games
    });
    // number of items fetched from server & filtered
    const [numberOfItems, setNumberOfItems] = useState<number>(0);
    
    // the next function will tell us how to sort the items fetched,
    // it receives three parameters:
    //  -the sort filter selected
    //  -the first item given from .sort() array method
    //  -the second item given from .sort() array method
    // and will return us a number (1 | -1 | 0)
    const sortBy = (sortFilter: alphaSort | yearSort, current_item: IMovie, next_item: IMovie) => {
        
        // accesing items interest fields so we don't have to access 
        // those every time that we enter a switch case
        const currentTitle = current_item.Title;
        const nextTitle = next_item.Title;
        const currentYear = +current_item.Year;
        const nextYear = +next_item.Year;  
        
        switch(sortFilter){
            case filterOptions.ascendant:
                // ascendant alphabetical order
                return currentTitle < nextTitle
                ? -1
                : currentTitle > nextTitle
                ? 1
                : 0
            case filterOptions.descendant:
                // descendant alphabetical order
                return currentTitle > nextTitle
                ? -1
                : currentTitle < nextTitle
                ? 1
                : 0
            case filterOptions.increase: 
                // increasing the year of movie/game outcome
                return currentYear < nextYear
                ? -1
                : currentYear > nextYear
                ? 1
                : 0
            case filterOptions.decrease:
                // decreasing the year of movie/game outcome
                return currentYear > nextYear
                ? -1
                : currentYear < nextYear
                ? 1
                : 0
            default:
                // no filter sort selected, we are returning the items as we are receiving these
                return 0;
        }
    }

    // we are using the useMemo hook here so moviesRendered
    // is calculated again only when movies array or filter state where changed
    const moviesRendered = useMemo(() => {
        const tempMoviesArray =
            typeof movies === "string"
                ? movies
                : movies
                    .filter((el) =>
                          // if filter selected is 'ALL' we don't need actually to filter the array so we are returning true in that case 
                          filter.type === filterOptions.all
                            ? true
                            : filter?.type === el?.Type?.toUpperCase()
                      )
                      .sort((current_item, next_item) =>
                          sortBy(filter?.titleSort || filter?.yearSort || filterOptions.ascendant, current_item, next_item)
                      );
        setNumberOfItems(tempMoviesArray.length);
        return tempMoviesArray;
        //eslint-disable-next-line
    }, [movies, filter]);

    return (
        <>
            <Box display={"flex-column"} alignItems={"center"} mt={2}>
                {/* filter component required */}
                <FilterBar
                    filtersSelected={filter}
                    setFilterSelected={setFilter}
                    numberOfItems={numberOfItems}
                />
                {loading ? (
                    <CircularProgress />
                ) : typeof moviesRendered === "string" ? (
                    <Typography color={"red"}>{moviesRendered}</Typography>
                ) : !moviesRendered?.length ? (
                    "No movies fetched, please click one of the buttons above to fetch some"
                ) : (
                    <Slide in timeout={600} direction="up">
                        <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
                            {moviesRendered?.map(
                                ({ Title, Poster, Year, Type, imdbID }) => (
                                    <MovieCard
                                        key={imdbID}
                                        title={Title}
                                        poster={Poster?.Poster || ""}
                                        year={Year}
                                        type={Type}
                                        id={imdbID}
                                    />
                                )
                            )}
                        </Masonry>
                    </Slide>
                )}
            </Box>
        </>
    );
};

export default MoviesContainer;
