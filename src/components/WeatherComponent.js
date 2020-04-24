import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Media } from 'reactstrap';

class Weather extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      weather     : {
        sunrise   : '',
        sunset    : '',
        noon      : '',
        daylength : ''
      }
    };
    
    this.setWeather = this.setWeather.bind(this);
  }

  componentDidMount() {
    // Fetch Weather Details
    fetch(`https://api.sunrise-sunset.org/json?lat=${encodeURIComponent(this.props.lang)}&lng=${encodeURIComponent(this.props.long)}`, {
      method : 'GET'
    }).then(res => res.json())
    .then(res => {
      this.setWeather(res.results.sunrise, res.results.sunset, res.results.solar_noon, res.results.day_length );
    })
    .catch(error => console.error('Error:', error));
  }

  setWeather = (sunrise, sunset, noon, daylength) => {
    var weather = {   
      sunrise    : sunrise,
      sunset     : sunset,
      noon       : noon,
      daylength  : daylength
    };
    this.setState({
      weather : weather
    });
  };
  
  render() {
    return(
      <div className="row row-content">
        <div className="col-12 d-flex justify-content-center">
          <h2>Weather</h2>
        </div>
        <div className="col-12 d-flex justify-content-center">
          <Media list className="p-0">
            <div className="col-12 mt-5">
            <Media tag="li">
                <Media key="1" left middle>
                    <Media object src='/assets/images/sunrise.png' alt='Sunrise' />
                </Media>
                <Media body className="ml-5">
                  <Media heading>Sunrise</Media>
                  <p>The Sun rises in your place at <strong>{this.state.weather.sunrise} </strong></p>
                </Media>
              </Media>
            </div>
            <div className="col-12 mt-5">
            <Media tag="li">
                <Media key="2" left middle>
                  <Media object src='/assets/images/noon.png' alt='Noon' />
                </Media>
                <Media body className="ml-5">
                  <Media heading>Noon</Media>
                  <p>The Sun is at its peak in your place at <strong>{this.state.weather.noon}</strong></p>
                </Media>
            </Media>
            </div>
            <div className="col-12 mt-5">
              <Media tag="li">
                <Media key="3" left middle>
                  <Media object src='/assets/images/sunset.png' alt='Sunset' />
                </Media>
                <Media body className="ml-5">
                  <Media heading>Sunset</Media>
                  <p>The Sun sets in your place at <strong>{this.state.weather.sunset}</strong></p>
                </Media>
              </Media>
            </div>
            <div className="col-12 mt-5">
              <Media tag="li">
                <Media key="4" left middle>
                  <Media object src='/assets/images/daylength.png' alt='Day Length' />
                </Media>
                <Media body className="ml-5">
                  <Media heading>Day Length</Media>
                  <p>The length of day in your place is <strong>{this.state.weather.daylength}</strong></p>
                </Media>
              </Media>
            </div>
          </Media>
        </div>
      </div>
    );
  }
}
  
export default withRouter(Weather);