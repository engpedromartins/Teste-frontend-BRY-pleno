import React, { useState, useEffect, } from 'react'
import { Link } from 'react-router-dom';

import FormComment from '../../Components/Form'
import ListCharacters from '../../Components/ListPeoples'
import CommentList from '../../Components/PostList'

import api from '../../Services/api.js';

export default function Synopsis(state) {
  // a variavel de url abaixo, é reponsave por receber a url do filme clicado 
  //que vem como state da pagina home através do component Link
  const url = state.history.location.state
  const [filme, setFilme] = useState([]);
  const [changePost, setChangePost] = useState([]);

  //função que faz a requisição afim de obter-se o filme clicado anteriormente
  useEffect(() => {
    api.get(url.url).then(response => {
      setFilme(response.data)
    })
  }, [])
  //função criada para fazer um update na lista de comentários
  // Obs: como estou acostumado a trabalhar com componentes de Classes e estou
  //me adaptando a essa abordagem moderna react, esse foi o jeito no qual 
  //encontrei a solução que precisava. Deve haver uma solução melhor, porém essa
  // foi a que me atendeu visto o tempo que tenho disponível

  function isClick(dados) {
    setChangePost(dados)
  }

  return (
    // renderiza a descrição dos filmes e chama os componentes de lista de 
    // pessoas, formulario e a lista de comentários
    <>
      <div className="header-synopsis">
        <Link to='/'>
          <h2>{filme.title}</h2>
        </Link>
      </div>
      <div className='container'>

        <div className='back'>
          <Link to='/'>
            <h3>
              {'<<'} Back
            </h3>
          </Link>
        </div>
        <p>{filme.opening_crawl}</p>
        <ListCharacters charactersUrl={filme.characters} />
        <FormComment clicked={isClick} />
        <CommentList handleUpdate={changePost} />
      </div>
    </>
  )
}

