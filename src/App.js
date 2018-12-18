import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Sidebar from './Sidebar';


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      origVenues: [],
      venues: [], //an array where all places will be stored 
      appError: false, 
      mapMarkers:[],
    };

    this.mapError = this.mapError.bind(this)
}

  componentDidMount(){    //render map on page
    this.getVenues()      //render places(venues) on the map
  }

  ComponentDidCatch(error){
    this.setState({appError: true})
  }

  mapScript = (url) => {    
    let index = window.document.getElementsByTagName("script")[0]   //select script tag
    let script = window.document.createElement("script")             //created script tag
    script.src = url
    script.async = true     // Asynchronously load the Google Maps script
    script.defer = true 
    index.parentNode.insertBefore(script, index)
  }

  loadMap = () => {
    this.mapScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBxgFcBZaOdr43RND5lbJOXdfV9y7rztuc&callback=initMap")    // Inserted API Key in the below call to load the map
    window.initMap= this.initMap   // Asynchronously load the Google Maps script, passing in the callback reference
  }

  getVenues = () =>{
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const params = {
      client_id: "SW1K41JLJIZHURLII5ZB5NEDDYEB0ZFGABUUVBQPKFO3AZWL",
      client_secret: "ADT5D5JGGHYFF25NJ1PNFMS3GOIUHVLDLCZP4MCI1LI1XWJ0",
      categoryId: "4bf58dd8d48988d12f941735",
      near: "San Francisco",
      v:"20181212"
    }

    axios.get(endPoint + new URLSearchParams(params))
    .then(response => {
      const vens = response.data.response.groups !== undefined ? response.data.response.groups[0].items: [] ;
      this.setState({
        origVenues : vens,
        venues: vens    //stored all places in state venues  
      },
      this.loadMap())  //render the map on the page only after all places were stored in state arrey 
    })
    .catch(error => {
      console.log("Error " + error)
    })
  }

  initMap = () => {   //function to initialize the map on the page
    const googleMap = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.77493, lng: -122.419416},
      zoom: 13,
      scrollwheel:true
    })

    this.state.venues.map(libVenue => {

      let content = (`<h4 id=venueName>${libVenue.venue.name}</h4><p id=address>${libVenue.venue.location.formattedAddress}</p>`);    //add infowindow on the marker

      let marker = new window.google.maps.Marker({    //add marker on the map
        position: {lat: libVenue.venue.location.lat, lng: libVenue.venue.location.lng},   //position is from the state venue arrey that stores all places in area
        map:googleMap,
        content: content,
        name:libVenue.venue.name,   //get the name of marker from venue state
        id:libVenue.venue.id,
        animation: window.google.maps.Animation.DROP,
        
      });

      marker.addListener('click', function() {    //add 'click' event listener on marker than infowindow opens

        infowindow.setContent(content)

        infowindow.open(googleMap, marker)
      })

      this.state.mapMarkers.push(marker);
      return marker;
    })

    let infowindow = new window.google.maps.InfoWindow({
      content: '',
      map:googleMap,
      venue:'',
    })

    this.setState({
      infowindow: infowindow
    })  
  }
  mapError = () => {   // Google Map Errors
    alert("There is a problem to load Google Maps. Please try reloading the page.")
  }


handleClick = (venue) =>{   //Open infoWindow if click on the list of venues
  console.log('handleClick=', venue);
  //this.state.infowindow.close();
  for(var i =0; i < this.state.mapMarkers.length; ++i){
    //console.log('id=', this.state.mapMarkers[i].id, ' venue.id=', venue.id);
    if (this.state.mapMarkers[i].id === venue.id){
      console.log('found');
      this.state.infowindow.setContent(this.state.mapMarkers[i].content);
      this.state.infowindow.open(this.state.mapMarkers[i].map, this.state.mapMarkers[i]);
      return;
    }
  }
  console.log('not found id=', venue.id);
  // this.state.mapMarkers.forEach(mapMarker =>{
  //   if(mapMarker.id === venue.venue.id){
  //     this.state.infowindow.open(some_map, mapMarker);
  //   }});
  }

searchVenue(query){
  console.log('searchVenue=', query);
  const arr = this.state.origVenues.filter( vn => vn.venue.name.toLowerCase().indexOf(query.toLowerCase()) >=0);
   this.setState({
     venues: arr    //stored all places in state venues  
   });
   //close any prev. opened title wnd
   this.state.infowindow.close();
   //console.log('markers=', this.state.mapMarkers);
   this.state.mapMarkers.forEach(mapMarker => {
         mapMarker.name.toLowerCase().includes(query.toLowerCase()) === true 
         ? mapMarker.setVisible(true) 
         : mapMarker.setVisible(false);
      }); 
}

  render() {
    if(this.state.appError){
      return <h1> There seems to be a problem.</h1>
    }
    return (
      <div className="app">
        <div id="app-name" tabIndex ="0">
          <h1>San Francisco Libraries</h1>
        </div>

        <Sidebar 
        role='complementary'
        venues={this.state.venues} 
        passClick={this.handleClick}
        onChange={(event) => {this.searchVenue(event.target.value)}}/>   

        <div id="map">
          </div>
      </div>
    );
  }
}

export default App;
