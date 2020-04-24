import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FormGroup, Label, Input, Progress, Col  } from 'reactstrap';

class Qualityscore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scores     : {},
      isCitiesLoaded   : false,
      isLoaded : false,
      isSelected : false,
      cities     : [],
      srcCity    : '',
      tarCity    : '',
      srcDetails : {},
      tarDetails : {}
    };

    this.setCities = this.setCities.bind(this);
    this.getQualityScore = this.getQualityScore.bind(this);
    this.renderDetails = this.renderDetails.bind(this);
    this.renderScores = this.renderScores.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);    
  }

  componentDidMount() {
    //Fecth Cost of living
    fetch('https://api.teleport.org/api/urban_areas/')
      .then(res => res.json())
      .then(res => {
        this.setCities(res._links['ua:item']);
      })
      .catch(error => console.error('Error:', error));
  }

  setCities = function(cities) {
    this.setState({
      cities : cities,
      isCitiesLoaded : true
    });
  };

  getQualityScore = (cityName) => {
    var url = this.state.cities.filter((city)=> city.name === cityName)[0].href + 'scores/';
    console.log(url)
    return fetch(url)
    .then(res => res.json())
    .then(res => {
      return (res);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  renderScores = function(scores) {
    return scores.map((item) => {
      return <div class="progress-block">
        <div className="text-center">{item.name} </div>
        <Progress animated color="info" value={item.score_out_of_10} max="10">{(item.score_out_of_10).toFixed(2)}/10</Progress>
      </div>
    });

  };

  renderDetails = function(city) {
    if(city) {
      var details = (city === this.state.srcCity) ? this.state.srcDetails : this.state.tarDetails,
          score   = details.teleport_city_score,
          summary = details.summary,
          scores  = details.categories;
          
      return <div>
        {this.renderScores(scores)}
        <span><strong>Quality Score : </strong>{score.toFixed(2)}/100 </span>
        <div><strong>About the City :</strong></div><div dangerouslySetInnerHTML={{ __html: summary }}></div>
      </div>
    } else {
      return <div></div>
    }
    
  }

  handleTypeChange(event){
    const target = event.target,
          value = target.value,
          name = target.name;

    if(name === 'srcCity') {
      let result = this.getQualityScore(value);
      result.then((targetValue) => {
        this.setState({
          srcCity  : value,
          srcDetails : targetValue

        });
      });

    } else {
      let result = this.getQualityScore(value);
      result.then((targetValue) => {
        this.setState({
          tarCity      : value,
          tarDetails   : targetValue
        });
      });      
    }
  }

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
            <h3>Compare Quality of Life  </h3> 
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
          <div className="col-12 col-sm-6 score-block"> 
            {this.renderDetails(this.state.srcCity)}
          </div>
          <div className="col-12 col-md-6 score-block"> 
          {this.renderDetails(this.state.tarCity)}
          </div>
        </div>
      </div>
    );
  }
}
  
export default withRouter(Qualityscore);