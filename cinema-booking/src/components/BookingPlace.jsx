import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const seatsData = [
  { row: "A", number: 1, status: "free" },
  { row: "A", number: 2, status: "booked" },
  { row: "A", number: 3, status: "free" },
  { row: "A", number: 4, status: "booked" },
  { row: "A", number: 5, status: "free" },
  { row: "B", number: 1, status: "booked" },
  { row: "B", number: 2, status: "free" },
  { row: "B", number: 3, status: "booked" },
  { row: "B", number: 4, status: "booked" },
  { row: "B", number: 5, status: "booked" },
];

const groupByRow = (data) => {
  return data.reduce((acc, seat) => {
    acc[seat.row] = acc[seat.row] || [];
    acc[seat.row].push(seat);
    return acc;
  }, {});
};

const Seat = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "selected" && prop !== "booked",
})(({ theme, selected, booked }) => ({
  textAlign: "center",
  padding: theme.spacing(2),
  border: "2px solid",
  borderRadius: 8,
  cursor: booked ? "not-allowed" : "pointer",
  backgroundColor: booked ? "#1976d2" : selected ? "#90caf9" : "transparent",
  color: booked ? "#fff" : "#1976d2",
  borderColor: "#1976d2",
  "&:hover": {
    backgroundColor: !booked && !selected ? "#e3f2fd" : undefined,
  },
}));

export default function BookingPlace() {
  const [selectedSeats, setSelectedSeats] = React.useState([]);

  const toggleSeat = (seat) => {
    if (seat.status === "booked") return;

    const id = `${seat.row}${seat.number}`;
    setSelectedSeats((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const seatsByRow = groupByRow(seatsData);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        placeItems: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: 600,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              'url("https://catchfoundation.in/_next/image?url=https%3A%2F%2Fcatch-foundation-s3-bucket-production.s3.ap-south-1.amazonaws.com%2FWildlife_informer_6a7110457f.webp&w=3840&q=75")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
        />

        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            placeItems: "center",
            px: 2,
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 200 }}>
            {Object.entries(seatsByRow).map(([rowName, rowSeats]) => (
              <Box key={rowName} sx={{ mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 1, color: "white", textAlign: "center" }}
                >
                  Row {rowName}
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                  {rowSeats.map((seat) => {
                    const seatId = `${seat.row}${seat.number}`;
                    const isSelected = selectedSeats.includes(seatId);
                    return (
                      <Grid item key={seatId}>
                        <Seat
                          onClick={() => toggleSeat(seat)}
                          booked={seat.status === "booked"}
                          selected={isSelected}
                          elevation={3}
                        >
                          {seatId}
                        </Seat>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
