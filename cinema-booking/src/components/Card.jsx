import { useState, useEffect } from "react";
import BookingPlace from "./BookingPlace"
import Footer from "./Footer"
import Header from "./Header"

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
        <Header/>
        <h1>{movies[0].movie}</h1>
        <img src={movies[0].poster} alt="" width={"200px"}/>
        <p>Duration: {movies[0].duration}</p>
        <p>{movies[0].description}</p>
        <h3>Area: {movies[0].area[0].name}</h3>
        <BookingPlace/>
        <Footer/>
    </>
  )
}


