# Leaflet Map App

This project is a Leaflet map application that utilizes the Neshan API to estimate the distance and duration between two points on the map based on the selected mode of transportation (car or motorcycle).
<hr/>

## Features
* Interactive map powered by Leaflet library
* Markers to select the starting and destination points
* Selectable mode of transportation (car or motorcycle)
* Estimate distance and duration between the selected points
* Display the estimated results on the map
* Technologies Used
* React.js: JavaScript library for building user interfaces
* Leaflet: Open-source JavaScript library for interactive maps
* Neshan API: Iranian mapping and routing service API
## Getting Started
 To run the project locally, follow these steps:

* Clone the repository:

```bash
git clone <repository-url>
Navigate to the project directory:
```

* Navigate to the project directory:

```bash
cd leaflet-map-app
Install the dependencies:
```

* Install the dependencies:

```bash
npm install
```

* Set up the Neshan API key:

- Obtain an API key from the Neshan API website (<https://developers.neshan.org/>).

- Create a .env file in the project root directory.

- Add the following line to the .env file:

```makefile
REACT_APP_NESHAN_API_KEY=YOUR_API_KEY
```
Replace YOUR_API_KEY with your actual Neshan API key.

* Start the development server:

```bash
npm start
```

* Open your browser and navigate to <http://localhost:3000> to see the app running.

## Usage
* Drag and drop the markers on the map to select the starting and destination points.
* Choose the mode of transportation (car or motorcycle) by selecting the corresponding option.
* The app will display the estimated distance and duration between the selected points.
* The results will be shown on the map.

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License.
