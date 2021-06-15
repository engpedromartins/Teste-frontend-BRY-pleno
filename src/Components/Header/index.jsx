import React from 'react';
import { Link } from 'react-router-dom'

import searchIcon from '../../img/search-icon.svg'
export default function Header({ handleChanged, value },) {

  return (
    <>
      <div className="header ">
        <Link to='/'>
          <h2>Star Wars movies</h2>
        </Link>
        <div className='search'>
          <input
            type="text"
            placeholder='   Search movies or characters'
            value={value}
            onChange={handleChanged}
          />
          <img src={searchIcon} />

        </div>

      </div>

    </>
  )
}