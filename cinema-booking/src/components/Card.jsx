import { useState, useEffect } from "react";

export default function Card(){

    const [movies, setMovie] = useState([]);
  
    useEffect(() => {
    fetch("https://demo8399230.mockable.io/sessions")
        .then((res) => res.json())
        .then((data) => {
        setMovie(data.sessions)
      });
  }, []);

if (movies.length === 0) return <p>Loading...</p>;
  return(
    <>
        <h1>{movies[0].movie}</h1>
        <img src={movies[0].poster} alt="" width={"200px"}/>
        <p>{movies[0].description}</p>
        <div>
            <img src={movies[0].area[0].background} alt="" />
                
        </div>
    </>
  )
}


