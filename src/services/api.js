export const getLocation = async (searchItem, lat, lng) => {
  return fetch(`https://api.neshan.org/v1/search?term=${searchItem}&lat=${lat}&lng=${lng}` , {
    method: 'GET',
    headers: {
        'Api-Key': 'service.770cad941d664088b047486c69d10aa5'
    //   'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
};

export const getDistance = async (device, refLat, refLng, destLat, destLng) => {
  return fetch(`https://api.neshan.org/v1/distance-matrix?type=${device}&origins=${refLat},${refLng}&destinations=${destLat},${destLng}` , {
    method: 'GET',
    headers: {
        'Api-Key': 'service.7af1ec1832874faba4825033b9058658'
    //   'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
};