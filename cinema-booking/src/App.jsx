import { useState, useEffect } from "react";
import Header from "./components/Header";
import SessionList from "./components/SessionList";
import Footer from "./components/Footer";
import useDebounce from "./customHooks/useDebounce"



function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
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
          if(session.date === '2025-07-01'){
            return {...session, date: todayStr}
          }
          else if(session.date === '2025-07-02'){
            return {...session, date: tomorrowStr}
          }
          else{
            return session
          }
        });

        const todaySessions = updatedSessions.filter(
          (session) => session.date === todayStr
        );

        setMovies(todaySessions);
      });
  }, []);

  const filter = movies.filter(item =>{
    return item.movie.toLowerCase().includes(debouncedSearch.toLowerCase())
  })

  return (
    <>
      <Header search={search} setSearch={setSearch} />
      <h2>Sessions for today</h2>
      <SessionList filter={filter}/>
      <Footer/>
    </>
  );
}

export default App;