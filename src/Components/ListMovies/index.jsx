import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Star from '../../img/star.svg'
import ImageSvg from '../../img/image.svg'
import ChairDirector from '../../img/chair-director-icon.svg'
import Calendar from '../../img/calendar-icon.svg'

import api from '../../Services/api.js';

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

const ListMovies = ({ dataSearch }) => {
  const [movieList, setMoviesList] = useState([]);

  useEffect(() => {
    api.get('https://swapi.bry.com.br/api/films', { header: 'no-cors' }).then(response => {
      setMoviesList(response.data.results)

    })
  }, [])


  let movieName = []
  let moviesName = []
  for (const obj of movieList) {
    movieName = obj.title
    moviesName = moviesName.concat(movieName)
  }
  useEffect(() => {
    let search = dataSearch
    const params = {
      search,
    }
    api.get('https://swapi.bry.com.br/api/films/', { params }).then(response => {
      setMoviesList(response.data.results)
    })
  }, [dataSearch]);


  return (
    <div>

      <div className='categories'>
        <img src={Star} alt="" />
        <h3>
          Movies
        </h3>
      </div>
      {movieList?.length < 3
        ? (<Splide
          options={{
            type: 'rewind',
            perPage: 3,
            rewind: true,
            flickPower: 300,
            autoWidth: true,
            arrows: false,
            gap: '2rem',
            pagination: false,
            focus: 'left',
            breakpoints: {
              767: {
                trimSpace: false,
                destroy: false,
              }
            },
            destroy: false,
          }}>
          {
            movieList.map((filme) => {
              return (
                <SplideSlide
                  key={filme.episode_id}>
                  <Link to={{
                    pathname: `/sinopse/${filme.episode_id}`,
                    state: { url: filme.url }
                  }}
                    style={{ textDecoration: 'none' }}>
                    <div className='box-movie'>
                      <div className='image-film'>
                        <img src={ImageSvg} alt="" />
                      </div>
                      <div className='box-content'>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <h2>{filme.title}</h2>
                          <small>{filme.opening_crawl}</small>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ marginBottom: '5px' }}><img src={ChairDirector} alt="" />{filme.director}</span>
                          <span><img src={Calendar} alt="" />{filme.release_date}</span>
                        </div>
                      </div>
                    </div>

                  </Link>
                </SplideSlide>
              )
            })
          }
        </Splide>)
        : (<Splide
          options={{
            type: 'loop',
            rewind: true,
            flickPower: 300,
            autoWidth: true,
            arrows: false,
            gap: '2rem',
            pagination: false,
            trimSpace: true,
            focus: 'left',
            breakpoints: {
              767: {
                trimSpace: false,
                destroy: false,
              }
            },
            destroy: false,
          }}>
          {
            movieList.map((filme) => {
              return (
                <SplideSlide
                  key={filme.episode_id}>
                  <Link to={{
                    pathname: `/sinopse/${filme.episode_id}`,
                    state: { url: filme.url }
                  }}
                    style={{ textDecoration: 'none' }}>
                    <div className='box-movie'>
                      <div className='image-film'>
                        <img src={ImageSvg} alt="" />
                      </div>
                      <div className='box-content'>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <h2>{filme.title}</h2>
                          <small>{filme.opening_crawl}</small>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ marginBottom: '5px' }}><img src={ChairDirector} alt="" />{filme.director}</span>
                          <span><img src={Calendar} alt="" />{filme.release_date}</span>
                        </div>
                      </div>
                    </div>

                  </Link>
                </SplideSlide>
              )
            })
          }
        </Splide>)}
    </div >
  )
}
export default ListMovies