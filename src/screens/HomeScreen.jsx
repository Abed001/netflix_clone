import React from 'react'
import './HomeScreen.css'
import Nav from '../Nav'
import Banner from '../Banner.jsx'
import Row from '../Row.jsx'
import requests from '../Requests.js'
import { Link } from "react-router-dom";

function HomeScreen() {
  return (
    <div className='homeScreen'>
      <Nav />
      <Banner />
      <Row title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow />

      <Row title="Trending Now"
        fetchUrl={requests.fetchTrending}
      />

      <Row title="Top Rated"
        fetchUrl={requests.fetchTopRated}
      />

      <Row title="Action Movies"
        fetchUrl={requests.fetchActionMovies}
      />

      <Row title="Comedy Movies"
        fetchUrl={requests.fetchComedyMovies}
      />

      <Row title="Horror Movies"
        fetchUrl={requests.fetchHorrorMovies}
      />

      <Row title="Romance Movies"
        fetchUrl={requests.fetchRomanceMovies}
      />

      <Row title="Documentaries"
        fetchUrl={requests.fetchDocumentries}
      />

    </div>
  )
}

export default HomeScreen
