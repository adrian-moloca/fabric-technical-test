import { Card, CardActions, CardContent, CardMedia, Link, Typography } from "@mui/material";
import { FC } from "react";
import placeholder from '../../../assets/images/film-poster-placeholder.png';
import { useStyles } from "./index.styles";

interface IProps {
    poster: string
    title: string
    type: string
    year: string
    id: string
}

const MovieCard: FC<IProps> = (props: IProps) => {

    const { poster, title, type, year, id } = props;
    const styles = useStyles();

    return (<>
        <Card>
            <CardMedia image={!!poster ? poster : placeholder} title={title} className={styles.posterStyle} />
            <CardContent>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="subtitle1">{type}</Typography>
                <Typography variant="subtitle1">{year}</Typography>
            </CardContent>
            <CardActions>
                <Link target={'_blank'} underline="none" href={`https://www.imdb.com/title/${id}`}>
                    <Typography variant="button">SHOW IN IMDB</Typography>
                </Link>
            </CardActions>
        </Card>
    </>);
}

export default MovieCard;