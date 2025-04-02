import React from 'react'
import { HiLocationMarker } from 'react-icons/hi'

const SearchBar = ({filter , setFilter}) => {
  return (
    <div className="flexCenter search-bar">
                    {/* already installed dependencies react-icons */}
                    <HiLocationMarker color="var(--blue)" size={25}/>
                    <input placeholder='Search By title/city/country' type="text" value={filter} onChange={(e)=>{setFilter(e.target.value)}}/>
                    <button className='button'>Search</button>
                </div>
  )
}

export default SearchBar