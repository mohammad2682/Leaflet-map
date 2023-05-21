import './App.css';
import React, { useState } from 'react';
import Map from './components/Map';
import AppContext from './AppContext';
import { getDistance, getLocation } from './services/api';
import { SearchResults } from './components/SearchResults';
import { useToast } from "izitoast-react";
import "izitoast-react/dist/iziToast.css";

function App() {
  const [searchItem, setSearchItem] = useState('');
  const [position, setPosition] = useState({lat: 35.72, lng: 51.35});
  const [searchResult, setSearchResult] = useState(null);
  const [refPosition, setRefPosition] = useState(null)
  const [refMarker, setRefMarker] = useState(false)
  const [destPosition, setDestPosition] = useState(null)
  const [destMarker, setDestMarker] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [device, setDevice] = useState(null)
  const [done, setDone] = useState(false)
  const [map, setMap] = useState(null)
  const [currentLocation, setCurrentLocation] = useState(false)
  const [myPosition, setMyPosition] = useState([])
  const [submitText, setSubmitText] = useState("تأیید مبدأ");

  const handleReset = () => {
    setPosition({lat: 35.72, lng: 51.35})
    map.flyTo([35.72, 51.35], 13)
    if (selectedDevice){
      selectedDevice.classList.remove('selected')
    }
    setSearchResult(null)
    setRefPosition(null)
    setRefMarker(false)
    setDestPosition(null)
    setDestMarker(false)
    setDone(false)
    setCurrentLocation(false)
    setDevice(null)
    setSelectedDevice(null)
    setSubmitText("تأیید مبدأ")
  }

  const showErrorMessage = useToast({
    // title: "تیم جدید ایجاد شد",
    message: "لطفاً وسیله نقلیه خود را انتخاب کنید",
    theme: "light",
    icon: "warn",
    color: "red",
    timeout:2000
  });
  
  let timeoutId;
  const handleLocation = () => {
    if(!refMarker){
      setRefMarker(true);
      setRefPosition(position);
      setSubmitText("تأیید مقصد");
    } else {
      setDestMarker(true);
      setDestPosition(position);
      setDone(true);
      setSubmitText("محاسبه مسافت")
    }

    if(submitText === "محاسبه مسافت"){
      // console.log("fsaffef", refPosition)
      getDistance(device, refPosition.lat, refPosition.lng, destPosition.lat, destPosition.lng).then((response) => {
        if (response.status === "Ok"){
          setSubmitText(response.rows[0].elements[0].distance.text + ", " + response.rows[0].elements[0].duration.text)
        } else {
          showErrorMessage();
        }
      }).then((error) => {
        console.log("Distance Error:", error);
      });
    }
  }

  const handleSearch = (event) => {
    timeoutId = setTimeout(() => { // set new timeout
      clearTimeout(timeoutId); // clear any previous timeouts
      setSearchItem(event.target.value);
      getLocation(event.target.value, position.lat, position.lng).then((response) => {
        setSearchResult(response.items)
      }).then((error) => {
        console.log("Location Error:", error);
      });
    }, 2000);
  }

  const handleDevice = (e) => {
    if (selectedDevice){
      selectedDevice.classList.remove('selected')
      setSubmitText("محاسبه مسافت");
    }
    const className = e.target.className;
    e.target.classList.add('selected')
    setSelectedDevice(e.target);
    setDevice(className);
  }

  const handleCurrentLocation = () => {
    setCurrentLocation(true)
    map.flyTo(myPosition, 18)
  }

  const toggleMarkerVisibility = () => {
    if (done) {
      setDone(false)
    }
    if (submitText === "تأیید مقصد"){
      setRefMarker(false)
      setSubmitText("تأیید مبدأ")
      map.flyTo(refPosition)
    } else {
      setDestMarker(false)
      setSubmitText("تأیید مقصد")
      map.flyTo(destPosition)
    }
    
  }
  
  return (
    <AppContext.Provider value={{
      searchItem, setSearchItem,
      position, setPosition,
      map, setMap,
      currentLocation, setCurrentLocation,
      myPosition, setMyPosition,
      setSearchResult,
      refPosition,
      refMarker, setRefMarker,
      destPosition,
      destMarker,
      done,
      toggleMarkerVisibility
    }}>
      <div className="App">
        <div className="map">
          <Map />
        </div>
        <div className="bottom-nav">
          <div className="current-location" onClick={handleCurrentLocation}>
            <img src="/locating.svg" alt="" />
          </div>
          <div className="reset" onClick={handleReset}>
            <img src="/refresh-light.svg" alt="" />
          </div>
          <div className="search-bar">
            <input type="text" placeholder='جست و جو' 
              onChange={handleSearch} />
              <button className='submit' onClick={handleLocation}>{submitText}</button>
          </div>
          <div className="device">
            <img src="/car.svg" className="car" alt="" onClick={handleDevice}/>
            <img src="/motorcycle.svg" className="motorcycle" alt="" onClick={handleDevice}/>
          </div>
        </div>
        <div className="search-result">
          {searchItem.length>=2 && searchResult?.map((result) => (
            <SearchResults result={result}/>
          )
          )}
        </div>
      </div>
    </AppContext.Provider>
  );
}


export default App;
