import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Col } from 'reactstrap';

class Currency extends Component {
  constructor(props) {
    super(props);

    this.state = {
      srcCurrencyType  : 'EUR',
      srcCurrency      : 1,
      tarCurrencyType  : 'EUR',
      tarCurrency      : 1,
      currCodeList     : ['EUR']
    };
  
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.setCurrList = this.setCurrList.bind(this);
    this.convertCurrency = this.convertCurrency.bind(this);
  }

  setCurrList = (currCodeList) => {
    this.setState({
      currCodeList : currCodeList
    });
  };

  convertCurrency(srcCode, tarCode, srcValue) {
    return fetch(`https://api.exchangeratesapi.io/latest?base=${encodeURIComponent(srcCode)}`)
    .then(res => res.json())
    .then(res => {
      let perValue = res.rates[tarCode];
      console.log(res.rates.tarCode);
      return (perValue * srcValue);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  componentDidMount() {
    fetch(`https://api.exchangeratesapi.io/latest?base=HUF`)
    .then(res => res.json())
    .then(res => {
      this.setCurrList(Object.keys(res.rates));
    })
    .catch(error => console.error('Error:', error));
  }

  handleAmountChange(event) {
    const target = event.target,
        value = target.value,
        name = target.name;

    if(name === 'srcCurrency') {
      let result = this.convertCurrency(this.state.srcCurrencyType, this.state.tarCurrencyType, value);
      result.then((targetValue) => {
        this.setState({
          srcCurrency : value,
          tarCurrency : targetValue
        });
      });
    } else {
      let result = this.convertCurrency(this.state.tarCurrencyType, this.state.srcCurrencyType, value);
      result.then((srcValue) => {
        this.setState({
          tarCurrency : value,
          srcCurrency : srcValue
        });
      });
    }  
  }

  handleTypeChange(event){
    const target = event.target,
          value = target.value,
          name = target.name;

    if(name === 'srcCurrencyType') {
      if(this.state.tarCurrencyType === value) {
        this.setState({
          srcCurrencyType : value,
          srcCurrency     : this.state.tarCurrency
        });
      } else {
        let result = this.convertCurrency(value, this.state.tarCurrencyType, this.state.srcCurrency);
        result.then((targetValue) => {
          this.setState({
          srcCurrencyType : value,
          srcCurrency     : targetValue
        });
      });
      }
      
    } else {
      if(this.state.srcCurrencyType === value) {
        this.setState({
          tarCurrencyType : value,
          tarCurrency     : this.state.srcCurrency
        });
      } else {
        let result = this.convertCurrency(value, this.state.srcCurrencyType, this.state.tarCurrency);
        result.then((srcValue) => {
          this.setState({
            tarCurrencyType : value,
            tarCurrency     : srcValue
          });
        });
      }
      
    }
  }

  render() {
    const currList = (this.state.currCodeList).map((code) => {
      return(
        <option key={code}>{code} </option>
      );
    });
    return(
      <div>
        <div className="row row-content">
          <div className="d-block col-12 col-sm-12">
            <h3>Currency</h3> 
            <p>Currency in {this.props.city} is {this.props.currency} </p>
          </div>
          <div className="col-12 col-sm-12">
            <Form>                  
              <FormGroup row>
                <Label htmlFor="srcCurrency" md={5}> Current Currency </Label>
                <Col sm={3}>
                  <Input type="select" name="srcCurrencyType"
                    value={this.state.srcCurrencyType || ''}
                    onChange={this.handleTypeChange}>
                      {currList}
                  </Input>
                </Col>
                <Col sm={4}>
                  <Input type="text" id="srcCurrency" name="srcCurrency"
                    value={this.state.srcCurrency}
                    onChange={this.handleAmountChange} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="tarCurrency" md={5}> Native Currency </Label>
                <Col sm={3}>
                  <Input type="select" name="tarCurrencyType"
                    value={this.state.tarCurrencyType || ''}
                    onChange={this.handleTypeChange}>
                      {currList}
                  </Input>
                </Col>
                <Col sm={4}>
                  <Input type="text" id="tarCurrency" name="tarCurrency"
                    value={this.state.tarCurrency}
                    onChange={this.handleAmountChange} />
                </Col>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Currency;