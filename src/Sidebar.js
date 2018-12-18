import React, { Component } from 'react';
import './App.css';

class Sidebar extends Component { 
  render() {
    const handler = this.props.venues;
    return (
      <nav id='sidebar'className='col-xs-12 col-md-4 col-lg-5' tabIndex='1'
      aria-labelledby='listbox'>
        
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="filter" tabIndex='2' aria-labelledby='input'>Filter Venues</span>
          </div>
            <input 
              id='inputFilter' type="text" className="form-control" placeholder="Venue Name" aria-label="Username" 
              aria-describedby="filter"
              onChange={this.props.onChange}
              />
        </div>
            <ul className='nav flex-column'>
              {handler.map((venues)=>
                  <li className='box' onClick={() => this.props.passClick(venues.venue)} key={venues.venue.id} tabIndex='3' aria-labelledby='listitem'>
                    <h4 id="siteTitle" >{venues.venue.name}</h4>
                      <p>{venues.venue.location.formattedAddress}</p>
                  </li>)}
            </ul>
      </nav>
    );
  }
}

export default Sidebar;