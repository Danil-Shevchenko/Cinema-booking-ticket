import { useState, useEffect } from "react";
import useDebounce from "./customHooks/useDebounce";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./components/Homepage";
import Card from "./components/Card";

function App() {
  const [movies, setMovies] = useState([]);
  const [allSessions, setAllSessions] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("today");
  const [days, setDays] = useState({ today: "", tomorrow: "" });
  const debouncedSearch = useDebounce(search, 800);

  useEffect(() => {
    fetch("https://demo8399230.mockable.io/sessions")
      .then((res) => res.json())
      .then((data) => {
        const today = new Date();
        const todayStr = today.toISOString().split("T")[0];

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split("T")[0];

        const updatedSessions = data.sessions.map((session) => {
          if (session.date === "2025-07-01") {
            return { ...session, date: todayStr };
          } else if (session.date === "2025-07-02") {
            return { ...session, date: tomorrowStr };
          } else {
            return session;
          }
        });

        setDays({ today: todayStr, tomorrow: tomorrowStr });

        setAllSessions(updatedSessions);

        const todaySessions = updatedSessions.filter(
          (session) => session.date === todayStr
        );

        setMovies(todaySessions);
      });
  }, []);

  const handleDateChange = (dateKey) => {
    setSelectedDate(dateKey);
    const selectedStr = days[dateKey];
    const filtered = allSessions.filter((session) => session.date === selectedStr);
    setMovies(filtered);
  };

  const filter = movies.filter((item) => 
    item.movie.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <Routes>
      <Route path="/" element={<Layout search={search} setSearch={setSearch} />}>
        <Route
          index
          element={
            <Homepage
              filter={filter}
              days={days}
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
            />
          }
        />
        <Route path="/session/:id" element={<Card movies={allSessions} />} />
      </Route>
    </Routes>
  );
}

export default App;
