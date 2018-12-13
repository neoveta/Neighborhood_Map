import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {

  state = {
    venues: [] //an arrey where all palces will be stored 
  }

  componentDidMount(){    //render map on page
    this.loadMap()
    this.getVenues()
  }


  mapScript = (url) => {       //this function is outside the react component
    let index = window.document.getElementsByTagName("script")[0] //select script tag
    let script = window.document.createElement("script")    //created script tag
    script.src = url
    script.async = true     // Asynchronously load the Google Maps script
    script.defer = true 
    index.parentNode.insertBefore(script, index)
  }

  loadMap = () => {
    this.mapScript("https://maps.googleapis.com/maps/api/js?  key=AIzaSyAkOOpjPuHxiUG6e3DhJDIMDYZ5zL9Pr98&callback=initMap")    // Inserted API Key in the below call to load the API
    window.initMap= this.initMap   // Asynchronously load the Google Maps script, passing in the callback reference
  }

  getVenues = () =>{
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const params = {
      client_id: "SW1K41JLJIZHURLII5ZB5NEDDYEB0ZFGABUUVBQPKFO3AZWL",
      client_secret: "ADT5D5JGGHYFF25NJ1PNFMS3GOIUHVLDLCZP4MCI1LI1XWJ0",
      query: "library",
      near: "San Francisco",
      v:"20181212"
    }
    axios.get(endPoint + new URLSearchParams(params))
    .then(response => {
      this.setState({
        venues: response    //stored all places in state venues 
      })
    })
    .catch(error => {
      console.log("Error " + error)
    })
  }


  initMap = () => {   //function to initialize the map
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
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
