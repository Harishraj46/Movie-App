import React from 'react'

const Search = ({search,setsearch}) => {
  return (
    <div className='search'>
        <div>
            <img src="./Search.svg" alt="search" />
            <input type="text" placeholder='Search' value={search} onChange={(e)=>setsearch(e.target.value)} />
        </div>
  
    </div>
    
  )
}

export default Search