import React, { useContext, useEffect, useRef } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { LocationMarker } from './LocationMarker'
import L from 'leaflet'
import AppContext from '../AppContext'

function Map() {
  const { position, refMarker, toggleMarkerVisibility, refPosition, destMarker, destPosition, done, map, setMap, currentLocation, myPosition, setMyPosition } = useContext(AppContext) 
  const markerRef = useRef();
  const markerDest = useRef();

  const myLocation = L.icon({
    iconUrl: '/my-location.svg',
    iconSize: [18, 25], // size of the icon
    iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  })

  function showPosition(position) {
    setMyPosition([position.coords?.latitude, position.coords?.longitude])
  }

  useEffect(() => {
    if (navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(showPosition)
    }
  })

  useEffect(() => {
    if (markerRef.current && !markerDest.current) {
      markerRef.current.openPopup();
    }
  });

  useEffect(() => {
    if (markerDest.current) {
      markerDest.current.openPopup();
    }
  });

// refMarkerPopup?.current?.openPopup()
  return (
    <>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className="map-container"
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {currentLocation && (
          <Marker position={myPosition} icon={myLocation}>
            <Popup>You are here</Popup>
          </Marker>
        )}
        
        {!done && map && <LocationMarker map={map} /> }

        {refMarker && (
          <Marker position={refPosition} ref={markerRef}>
            <Popup closeButton={false} className="custom-popup" keepInView={false} autoPan={false} closeOnClick={false}>
              {/* <img className="close-popup" src="/close.svg" alt="" /> */}
              { !destMarker && <img className="close-popup" src="/close.svg" alt="" onClick={toggleMarkerVisibility}/>}
              مبدأ
            </Popup>
          </Marker>
        )}
        {destMarker && (
          <Marker position={destPosition} ref={markerDest}>
            <Popup closeButton={false} className="custom-popup" keepInView={false} autoPan={false}>
              <img className="close-popup" src="/close.svg" alt="" onClick={toggleMarkerVisibility}/>
              مقصد
            </Popup>
          </Marker>
        )}

      </MapContainer>
    </>
  )
}

let DefaultIcon = L.icon({
  iconUrl: '/location.svg',
  shadowUrl: '/marker-shadow.png',
  iconSize: [30, 37],
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [10, 41],
  shadowAnchor: [10, 70], // the same for the shadow
  popupAnchor: [2, -40],
})
L.Marker.prototype.options.icon = DefaultIcon

export default Map
