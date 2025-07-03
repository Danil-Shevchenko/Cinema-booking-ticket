import SessionList from "./SessionList";
import SessionDate from "./SessionDate";

function Homepage({ filter, days, selectedDate, onDateChange }) {
  return (
    <>
      <SessionDate
        days={days}
        selectedDate={selectedDate}
        onDateChange={onDateChange}
      />
      <SessionList filter={filter} />
    </>
  );
}

export default Homepage;
