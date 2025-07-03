import { useParams } from "react-router-dom";
import BookingPlace from "./BookingPlace";
import PopUp from "./PopUp";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function Card({ movies }) {
  const { id } = useParams();

  const formatDuration = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs}:${mins.toString().padStart(2, "0")}`;
  };

  const handleTrailerShow = () => {
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/n9xhJrPXop4"
      title="Dune trailer"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />;
  };

  if (!movies || movies.length === 0) return <p>Loading...</p>;

  const movie = movies.find((m) => String(m.id) === id);
  if (!movie) return <p>Movie not found</p>;

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        <Grid size={{ lg: 2 }} sx={{ display: { xs: "none", lg: "block" } }}>
          <img
            src={movie.poster}
            alt={movie.movie}
            style={{
              width: "100%",
              maxWidth: "500px",
              borderRadius: "8px",
            }}
          />
        </Grid>
        <Grid
          size={{ xs: 12 }}
          sx={{
            display: { xs: "block", lg: "none" },
            height: { xs: "300px", md: "500px" },
          }}
        >
          <iframe
            width="100%"
            height="100%"
            src={movie.trailer}
            title={movie.movie}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 10 }}>
          <Stack spacing={2}>
            <h1>{movie.movie}</h1>
            <h2>Session start: {movie.time}</h2>
            <p>Duration: {formatDuration(movie.duration)}</p>
            <p>Description: {movie.description}</p>
            <Button
              sx={{ 
                display: { xs: "none", lg: "block" },
                width: '200px'
              }}
              onClick={handleTrailerShow}
              variant = 'contained'
            >
              Watch trailer
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <h3>Hall: {movie.area[0].name.toUpperCase()}</h3>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <Box sx={{ flex: 2 }}>
          <BookingPlace movie={movie} />
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            minHeight: "auto",
          }}
        >
          <Box>
            <ul>
              <li>Example item</li>
              <li>Another item</li>
            </ul>
          </Box>
          <Box sx={{ mt: "auto" }}>
            <PopUp />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
