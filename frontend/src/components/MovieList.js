import React from "react";
import {
  List,
  ListItem,
  CardMedia,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Skeleton,
} from "@mui/material";
import { arrayBufferToBase64 } from "../utils";
import styled from "@emotion/styled";

const StyledList = styled(List)(
  ({ theme }) => `
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  justify-content: "center";
`
);

const StyledListItem = styled(ListItem)(
  ({ theme }) => `
  display: flex;
  height: 100%;
`
);

const StyledCardMedia = styled(CardMedia)(
  ({ theme }) => `
  width: 100%;
  height: 15vw;
`
);

const MovieList = ({ sortMovies, movies }) => {
  return (
    <StyledList>
      {sortMovies(movies).map((movie) => (
        <StyledListItem key={movie._id}>
          <Card
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {movie.poster?.image?.data ? (
              <StyledCardMedia
                component="img"
                alt={movie.title}
                src={`data:image/jpeg;base64,${arrayBufferToBase64(
                  movie.poster?.image?.data
                )}`}
              />
            ) : (
              <Skeleton
                data-testid="skeleton"
                variant="rectangular"
                width={"100%"}
                height={"15vw"}
              />
            )}
            <CardContent sx={{ flex: 1 }}>
              <Typography gutterBottom variant="h5" component="div">
                {movie.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {movie.year} {movie.type}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                href={`https://www.imdb.com/title/${movie.imdbID}/`}
                target="_blank"
                rel="noreferrer"
              >
                IMDB
              </Button>
            </CardActions>
          </Card>
        </StyledListItem>
      ))}
    </StyledList>
  );
};

export default MovieList;
