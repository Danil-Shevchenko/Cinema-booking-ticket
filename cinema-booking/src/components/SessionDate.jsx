import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

export default function SessionDate({ days, selectedDate, onDateChange }) {
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    return `${day} ${month}`;
  }
  return (
    <Box sx={{ m: 1, display: "flex", flexDirection:"column", alignItems: "center" }}>
      <Stack direction="row" spacing={1}>
        <Button
          variant={selectedDate === "today" ? "contained" : "outlined"}
          onClick={() => onDateChange("today")}
        >
          {formatDate(days.today)}
        </Button>
        <Button
          variant={selectedDate === "tomorrow" ? "contained" : "outlined"}
          onClick={() => onDateChange("tomorrow")}
        >
          {formatDate(days.tomorrow)}
        </Button>
      </Stack>
      <h2>Sessions for {selectedDate}</h2>
    </Box>
  );
}
