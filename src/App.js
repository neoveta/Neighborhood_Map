import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {

  componentDidMount(){    //render map on page
    this.loadMap()
  }

  loadMap = () => {
    this.mapScript("https://maps.googleapis.com/maps/api/js?  key=AIzaSyAkOOpjPuHxiUG6e3DhJDIMDYZ5zL9Pr98&callback=initMap")    // Inserted API Key in the below call to load the API
    window.initMap= this.initMap   // Asynchronously load the Google Maps script, passing in the callback reference
  }

  initMap = () => {   //function to initialize the map
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }

  mapScript = (url) => {       //this function is outside the react component
    let index = window.document.getElementsByTagName("script")[0] //select script tag
    let script = window.document.createElement("script")    //created script tag
    script.src = url
    script.async = true     // Asynchronously load the Google Maps script
    script.defer = true 
    index.parentNode.insertBefore(script, index)

  }

  render() {
    return (
      <div className="app">
        <div id="map">
      
        </div>
      </div>
    );
  }
}


  // <script async defer 
  // src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAkOOpjPuHxiUG6e3DhJDIMDYZ5zL9Pr98&callback=initMap">
  // </script>  
 // Inserted API Key in the below call to load the API

// function mapScript(url){       //this function is outside the react component
//   let index = window.document.getElementsByTagName("script")[0] //select script tag
//   let script = window.document.createElement("script")    //created script tag
//   script.src = url
//   script.async = true     //Load the JS API ASYNCHRONOUSLY
//   script.defer = true 
//   index.parentNode.insertBefore(script, index)
// }


export default App;
