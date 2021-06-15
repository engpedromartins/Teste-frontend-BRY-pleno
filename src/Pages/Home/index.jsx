import React from 'react'
import ListMovies from '../../Components/ListMovies'
import ListCharacters from '../../Components/ListPeoples'
import Header from '../../Components/Header';

export default function Home() {
  const [searchTerm, setSearchTerm] = React.useState("");

  function handleChange(event) {
    setSearchTerm(event.target.value);
  };

  return (
    //renderiza o Header, Lista de filmes e a lista de atores.
    <>
      <Header handleChanged={handleChange} searchTerm />
      <div className='container'>
        <ListMovies dataSearch={searchTerm} />
        <ListCharacters dataSearch={searchTerm} />
      </div>
    </>
  )
}