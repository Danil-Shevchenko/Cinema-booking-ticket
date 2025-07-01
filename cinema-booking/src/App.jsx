import { useState, useEffect } from "react";
import Header from "./components/Header";


function App() {
  const [movies, setMovie] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetch("https://demo8399230.mockable.io/sessions")
      .then((res) => res.json())
      .then((data) => {
        setMovie(data.sessions)
      });
  }, []);

  const filter = movies.filter(item =>{
    return item.movie.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <>
      <Header search={search} setSearch={setSearch} />
      <ul>
        {filter.map(item=>
          (<li key={item.id}>
            <img src={item.poster} alt="" width={"200px"}/>
          </li>)
        )}
      </ul>
    </>
  );
}

export default App;
