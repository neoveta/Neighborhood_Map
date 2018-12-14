import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {

  state = {
    venues: [] //an arrey where all palces will be stored 
  }

  componentDidMount(){    //render map on page
    //this.loadMap()
    this.getVenues()
  }


  mapScript = (url) => {    
    let index = window.document.getElementsByTagName("script")[0] //select script tag
    let script = window.document.createElement("script")    //created script tag
    script.src = url
    script.async = true     // Asynchronously load the Google Maps script
    script.defer = true 
    index.parentNode.insertBefore(script, index)
  }

  loadMap = () => {
    this.mapScript("https://maps.googleapis.com/maps/api/js?  key=AIzaSyCG1UKw5yaq05cbuV27ZwuM2rNPWFO9Atg&callback=initMap")    // Inserted API Key in the below call to load the map
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
        venues: response.data.response.groups[0].items    //stored all places in state venues  
      },
      this.loadMap())  //render the map on the page only after all places were stored in state arrey 
    })
    .catch(error => {
      console.log("Error " + error)
    })
  }


  initMap = () => {   //function to initialize the map
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.77493, lng: -122.419416},
      zoom: 13
    })

    let infowindow = new window.google.maps.InfoWindow({
      //content: contentString
    })

    this.state.venues.map(libVenue => {

      let contentString = `${libVenue.venue.name}`    //add infowindow on the map

      let marker = new window.google.maps.Marker({    //add marker on the map
        position: {lat: libVenue.venue.location.lat, lng: libVenue.venue.location.lng},   //position is from the state venue arrey that stores all places in area
        map: map,
        title:libVenue.venue.name   //get the name of marker from venue state
      })

      marker.addListener('click', function() {    //add 'click' event listener on marker than infowindow opens

        infowindow.setContent(contentString)

        infowindow.open(map, marker);
      })

    })

  }

  render() {
    return (
      <div className="app">
      <div id="app-name">
        <h1> San Francisco Libraries. </h1>
      </div>
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
