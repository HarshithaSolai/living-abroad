import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Currency from './CurrencyComponent';
import Weather from './WeatherComponent';
import LifeStyle from './LifeStyleComponent';
import Qualityscore from './QualityScoreComponent';
import Contact from './ContactComponent';
import Footer from './FooterComponent';


class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error     : null,
      isLoaded  : false,
      ipAddress : '',
      city      : '',
      country   : '',
      lang      : '',
      long      : '',
      currency  : '',
      lifestyle : {}
      
    };

    this.setIP = this.setIP.bind(this);
    this.setDetails = this.setDetails.bind(this);
  }

  setIP = (ip) => {
    this.setState({
      ipAddress : ip
    });
  };

  setLifeStyle = (lifestyle) => {
    this.setState({
      lifestyle : lifestyle
    });
  };


  setDetails = (city, country, lang, long, currency) => {
    this.setState({
      city     : city,
      country  : country,
      lang     : lang,
      long     : long,
      currency : currency
    });
  };

  componentDidMount() {
    //Fetch IP Address of the client
    fetch('https://api.ipify.org/?format=json')
    .then(res => res.json())
    .then(response => {
      this.setIP(response.ip);
      if(localStorage.getItem('ipAddress') && localStorage.getItem('ipAddress') === response.ip) {
        var userDetails = localStorage.getItem('userDetails');
        this.setDetails(userDetails.city, userDetails.country, userDetails.latitude, userDetails.longitude, userDetails.currency);
      } else {
          var url = `https://ipapi.co/${this.state.ipAddress}/json/`;
          //Fetch Details for City, Country, Langitude, Longitude, Currency Code
          fetch(url)
          .then(res => res.json())
          .then(res => {
            console.log(res);

            if(!res.message){
              localStorage.setItem('ipAddress', response.ip);
            var userDetails = {
              city    : res.city,
              country : res.country_name ,
              latitude : res.latitude, 
              longitude : res.longitude,
              currency  :  res.currency
            };
            localStorage.setItem('userDetails', userDetails);
            this.setDetails(res.city, res.country_name, res.latitude, res.longitude, res.currency);
            }
            
          })
          .catch(error => console.error('Error:', error))
      }
      
    })
    .catch(error => console.error('Error:', error))  
  }

  render() {
    return(
      <div>
        <Header />
        <div class="container-fluid">
          <Switch>
            <Route path="/" component={() => <Home />} exact/>
            <Route path="/home" component={() => <Home />} exact/>
            <Route path="/currency" component={() => <Currency city={this.state.city} currency={this.state.currency} setCurrency={this.state.setCurrency}  />} exact/>
            <Route path="/lifestyle" component={() => <LifeStyle currency={this.state.currency} lifestyle={this.state.lifestyle} city={this.state.city} setLifeStyle={this.state.setLifeStyle}  />} exact/>
            <Route path="/weather" component={() => <Weather lang={this.state.lang} long={this.state.long} />} exact/>
            <Route path="/qualityscore" component={() => <Qualityscore />} exact/>
            <Route path="/contact" component={() => <Contact />} exact/>
            <Redirect to="/home" />
          </Switch>
        </div>
        <Footer />
        </div>
        );
    }
}

export default withRouter(Main);