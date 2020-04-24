import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Table, FormGroup, Label, Input, Progress, Col  } from 'reactstrap';

class LifeStyle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded : false,
      cities     : [],
      srcCity    : '',
      tarCity    : '',
      srcDetails : {},
      tarDetails : {}
    };

    this.setCities = this.setCities.bind(this);
    this.getLifeStyle = this.getLifeStyle.bind(this);
    this.renderTableHeader = this.renderTableHeader.bind(this);
    this.renderTableData = this.renderTableData.bind(this);
    this.renderNative = this.renderNative.bind(this);
    this.renderScores = this.renderScores.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  componentDidMount() {
    //Fetch List of cities
    fetch('https://api.teleport.org/api/urban_areas/')
    .then(res => res.json())
    .then(res => {
      this.setCities(res._links['ua:item']);
    })
    .catch(error => console.error('Error:', error));
  }

  setCities = function(cities) {
    this.setState({
      cities : cities
    });
  };

  getLifeStyle = (cityName) => {
    //Fetch Cost of living data
    return fetch(`https://cost-of-living-app.herokuapp.com/${cityName}`)
    .then(res => res.json())
    .then(res => {
      return res.costs;
    })
    .catch(error => console.error('Error:', error));
  };

  renderScores = function(scores) {
    return scores.map((item) => {
      return <div className="progress-block">
        <div className="text-center">{item.name} </div>
        <Progress animated color="info" value={item.score_out_of_10} max="10">{(item.score_out_of_10).toFixed(2)}/10</Progress>
      </div>
    });
  };

  handleTypeChange = function(event){
    const target = event.target,
          value = target.value,
          name = target.name;

    if(name === 'srcCity') {
      let result = this.getLifeStyle(value);
      result.then((targetValue) => {
        this.setState({
          srcCity  : value,
          srcDetails : targetValue,
          isLoaded : true
        });
      });
    } else {
      let result = this.getLifeStyle(value);
      result.then((targetValue) => {
        this.setState({
          tarCity      : value,
          tarDetails   : targetValue,
          isLoaded : true
        });
      });      
    }
  };
  
  renderTableHeader = function() {
    if(this.state.isLoaded) {
      let header = ['Item', 'Cost in Current Place', 'Cost in Native Place'];
      return header.map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>
      })
    }
  };

  renderTableData = function() {
    if(this.state.isLoaded) {
    return this.state.srcDetails.map((criteria, index) => {
       const { item, cost } = criteria; //destructuring
        return (
          <tr key={index}>
            <td>{item}</td>
            <td>{cost}</td>
            <td>{this.renderNative(index)}</td>
          </tr>
        )
      })
    }
  };

  renderNative = function(i) {
    if(this.state.tarDetails.length) {
      return this.state.tarDetails.filter((item, index) => index === i)[0].cost;
    } else {
      return '';
    }
  };
  
  render() { 
    const cityList = (this.state.cities).map((city) => {
      return(
        <option key={city.name}>{city.name} </option>
      );
    });

    return(
      <div>
        <div className="row">
          <div className="d-block col-12 col-sm-12 d-flex justify-content-center mt-5">
            <h3>Compare Cost of Living</h3> 
          </div>
        </div>
        <div className="row mx-auto form">
          <Col sm={6} className="d-flex justify-content-center">
            <FormGroup>
              <Label htmlFor="srcCity"> Current City: </Label>
                <Input type="select" name="srcCity" value={this.state.srcCity || ''}
                  onChange={this.handleTypeChange}>
                    {cityList}
                </Input>
              </FormGroup>
            </Col>
            <Col sm={6} className="d-flex justify-content-center">
              <FormGroup>
                <Label htmlFor="tarCity"> Native City: </Label>
                <Input type="select" name="tarCity" value={this.state.tarCity || ''}
                  onChange={this.handleTypeChange}>
                    {cityList}
                </Input>
              </FormGroup>
            </Col>
        </div>
        <div className="row row-content card-view">
          <div className="col-12 col-sm-12 score-block"> 
            <Table responsive>
              <thead>
                <tr>{this.renderTableHeader()}</tr>
              </thead>
              <tbody>                
                {this.renderTableData()}          
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}
  
export default withRouter(LifeStyle);


