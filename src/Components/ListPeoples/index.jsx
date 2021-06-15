import React, { useState, useEffect } from 'react';

import UserCircle from '../../img/user-circle.svg'
import Map from '../../img/map-marker-alt.svg'
import UserFriends from '../../img/user-friends.svg'

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import api from '../../Services/api.js';

const ListCharacters = ({ dataSearch, charactersUrl }) => {
  const [peoples, setPeoples] = useState([]);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {

    handleGetPlanet()
    handleGetPeople(charactersUrl)

  }, [])

  //------------------------------------------------------------------
  //requisições dos planeta e dos personagens
  //------------------------------------------------------------------
  //GET PEOPLES
  async function handleGetPeople(data) {
    // 1º Cria-se as variáveis de pagina, lista de pessoas e resultado de pessoas
    // 2º No laço while, enquanto a variavel page for > 0, vai ser feita a 
    //requisição API salvando os dados dentro de peopleList, até que a variavel 
    //data.next seja falsa. Enquanto isso, a cada passagem dentro do loop while 
    //a variavel peopleList é concatenada dentro de peoplesResults, salvando 
    //todos os usuários

    //OBS: O mesmo procedimento ocorre para a requisição em seguida GET PLANETS

    // 
    try {
      let page = 1;
      let peopleList = []
      let peoplesResult = []
      const params = {
        page,
      };

      //condição para renderizar todos os personagens ou somentos os personagens 
      //do filme
      if (charactersUrl?.length) {
        for (let i = 0; i < charactersUrl?.length; i = i + 1) {
          // Request planets
          const response = await api.get(charactersUrl[i])

          // Get response
          if (response) {
            const { data } = response;
            peopleList = data.results
          }
          peoplesResult = peoplesResult.concat(peopleList)

        }
      } else {
        while (page > 0) {
          params.page = page;

          // Request planets
          const response = await api.get(`https://swapi.bry.com.br/api/people/`, { params })

          // Get response
          if (response) {
            const { data } = response;
            peopleList = data.results
            if (data.next) {
              page = page + 1;
            } else {
              page = -1;
            }
          }
          peoplesResult = peoplesResult.concat(peopleList)

        }
      }
      setPeoples(peoplesResult)
      //SALVA OS PERSONAGENS NA LOCAL STORAGE PRA EVITAR FAZER NOVA REQUISIÇÃO
      //EM UM CENÁRIO REAL PODERIA SER ARMAZENADO EM UMA VARIAVEL UTILIZANDO REDUX
      localStorage.setItem('peoples',
        JSON.stringify(peoples))

    } catch (error) {
      const { response } = error;
      const { data } = response;
      throw new Error(`status: ${response.status} - message: ${data.message}`);
    }
  }

  //GETPLANETS
  async function handleGetPlanet() {
    try {
      let page = 1;
      let planetsList = []
      let planetsResult = []
      const params = {
        page,
      };

      while (page > 0) {
        params.page = page;

        // Request planets
        const response = await api.get('https://swapi.bry.com.br/api/planets/', { params })

        // Get response
        if (response) {
          const { data } = response;
          planetsList = data.results
          if (data.next) {
            page = page + 1;
          } else {
            page = -1;
          }
        }
        planetsResult = planetsResult.concat(planetsList)

      }
      setPlanets(planetsResult)
      localStorage.setItem('peoples',
        JSON.stringify(planets))


    } catch (error) {
      const { response } = error;
      const { data } = response;
      throw new Error(`status: ${response.status} - message: ${data.message}`);
    }
  }
  //_______________________________________________________________________
  // FIM DAS REQUISIÇÕES DE PLANETAS E PESSOAS
  //_______________________________________________________________________

  //função que pega a url do planeta de cada personagem, separando ela da url e
  //diminuindo 1 de seu valor, visto que o valor de cada planeta - 1 corresponde
  //a posição do planeta na lista de planetas
  function queryPlanet(planetUrl) {
    let searchPlanet = planetUrl.replaceAll('/', '').split('planets')
    let planetId = parseInt(searchPlanet[1])
    let planet = planetId - 1
    return planet
  }

  useEffect(() => {
    if (dataSearch) {
      let search = dataSearch
      const params = {
        search,
      }
      api.get('https://swapi.bry.com.br/api/people/', { params }).then(response => {
        setPeoples(response.data.results)
      })
    }
  }, [dataSearch]);


  return (
    // Aqui é renderizado o carroussel, usei esse carrousse a fim de aprendizado.
    // infelizmente os breackpoints dele, não me permitem escolher setas para o modo
    // web e tiralas para o modo mobile, logo vou ficar devendo essa :(
    // Mas, pra ficar claro, o breackpoints aqui funciona justamente para fazer o
    // carroussel se adaptar a partir daquela medida para outro formato. A documentação
    // da blibioteca pode ser encontrada aqui: https://splidejs.com/integration-react-splide/

    < div >
      <div className='categories'>
        <img src={UserFriends} style={{ height: '17px' }} alt="" />
        <h3>
          Characters
        </h3>
      </div>
      {peoples.length < 4
        ? (<Splide
          options={{
            type: 'rewind',
            perPage: '4',
            arrows: false,
            pagination: false,

            breakpoints: {
              767: {
                destroy: false,
                type: 'loop',
                rewind: true,
                perMove: 1,
                flickPower: 300,
                autoWidth: true,
                gap: '2rem',
                pagination: false,
                trimSpace: true,
                focus: 'left',
              }
            },
          }}>
          {peoples.map((people) => {
            let planetId = queryPlanet(people.homeworld)
            return (
              <SplideSlide key={people.name}>
                <div className='box-people'>
                  <img src={UserCircle} alt="" />
                  <h2>{people.name}</h2>
                  <img src={Map} alt="" />
                  <small>{planets[planetId]?.name}</small>
                </div>
              </SplideSlide>
            )
          })}
        </Splide>)
        : (<Splide
          options={{
            type: 'loop',
            perPage: '4',
            arrows: false,
            pagination: false,

            breakpoints: {
              767: {
                destroy: false,
                type: 'loop',
                rewind: true,
                perMove: 1,
                flickPower: 300,
                autoWidth: true,
                gap: '2rem',
                pagination: false,
                trimSpace: true,
                focus: 'left',
              }
            },
          }}>
          {peoples.map((people) => {
            let planetId = queryPlanet(people.homeworld)
            return (
              <SplideSlide key={people.name}>
                <div className='box-people'>
                  <img src={UserCircle} alt="" />
                  <h2>{people.name}</h2>
                  <img src={Map} alt="" />
                  <small>{planets[planetId]?.name}</small>
                </div>
              </SplideSlide>
            )
          })}
        </Splide>)}
    </div >
  )
}

export default ListCharacters