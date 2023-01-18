import { Container, Divider, Typography } from "@mui/material";
import { FC, useState } from "react"
import ButtonsContainer from "../../components/container/buttons-container";
import { IMovie } from "../../utils/interfaces";
import MoviesContainer from "../../components/container/movies-container";

/* our Main Application, no state management library (e. Redux)
 * were choose, as we don't need one because we have a single route app
 */  

const Main: FC = () => {

    //loading state
    const [loading, setLoading] = useState<boolean>(false);
    //movies state --> if fetching the collection we will get an error
    //we will save the message inside the same state as a string
    const [movies, setMovies] = useState<IMovie[] | string>([]);

    return (<>
        <Container fixed>
            {/* title */}
            <Typography variant="h4" my={2}>Matrix series</Typography>
            <Divider/>
            {/* Trigger component, it will fetch the collections */}
            <ButtonsContainer loading={loading} setLoading={setLoading} setMovies={setMovies} />
            {/* Collection Vetrina --> Itself shows to us the collection fetched from server & also containes the filter/sort component required */}
            <MoviesContainer movies={movies} loading={loading} />
        </Container>
    </>);
}

export default Main;
