import React, { useContext, useCallback, useEffect } from 'react'
import { Marker } from 'react-leaflet'
import AppContext from '../AppContext'

export function LocationMarker({ map }) {
  const { position, setPosition} = useContext(AppContext)

  const onMove = useCallback(() => {
    setPosition(map.getCenter())
    // console.log(map.getCenter(), 'center')
  }, [map, setPosition])

  useEffect(() => {
    map.on('move', onMove)
    return () => {
      map.off('move', onMove)
    }
  }, [map, onMove])

  return (
    <>
      <Marker id="marker-abs" position={position}>
        {' '}
      </Marker>
    </>
  )
}
