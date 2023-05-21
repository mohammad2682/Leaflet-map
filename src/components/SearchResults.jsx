import React, { useContext } from 'react'
import AppContext from '../AppContext'

export const SearchResults = (result) => {
  const { setSearchResult, setPosition, map } =
    useContext(AppContext)

  const handleResult = () => {
    const newMarker = {
      position: [result.result.location.y, result.result.location.x],
      title: result.result.title,
      address: result.result.address,
      region: result.result.region,
    }
    setPosition(newMarker.position)
    setSearchResult(null)
    map.flyTo(newMarker.position, 16)
    // console.log(newMarker.position)
  }
  return (
    <div className="search-result">
      <p onClick={handleResult}>
        {result.result.region}، {result.result.address}، {result.result.title}
      </p>
      <hr />
    </div>
  )
}
