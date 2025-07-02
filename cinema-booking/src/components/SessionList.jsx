import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

export default function SessionList({ filter }) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        {filter.map((movie) => (
          <Grid item key={movie.id}>
            <Card sx={{ maxWidth: 250, height: 460 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height={"370px"}
                  image={movie.poster}
                  alt={movie.movie}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {movie.movie}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {movie.time}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
