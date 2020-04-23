import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Jumbotron, Card, CardImg, CardText, CardBody,
  Button, Row, Col, Media} from 'reactstrap';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return(
      <div className="pb-50">
        <Jumbotron fluid>
          <Row>
            <Col sm={12}>
              <Media object width="100%" height="auto" src="/assets/images/living.png" alt="Title Image" />
            </Col>
          </Row>
        </Jumbotron> 

        <Row className="row-content card-view">

          <Col sm={{ size: 3}}>
            <Card>
              <CardImg top src="/assets/images/currency.png" alt="Card image cap" />
              <CardBody>
                <CardText>Currency is the first change that one faces in the new place. This utility is useful for easy currency conversion.</CardText>
                <Link to={`/currency`} >
                  <Button className="mx-auto d-block" color="info">Check Now</Button>
                </Link>
              </CardBody>
            </Card>
          </Col>
      
          <Col sm={{ size : 3  }}>
            <Card>
              <CardImg top  src="/assets/images/lifestyle.png" alt="Card image cap" />
              <CardBody>
                <CardText>Want to know about quality of life in your current place and native place ? This utility provides quality score of various locations.</CardText>
                <Link to={`/qualityscore`} >
                  <Button className="mx-auto d-block" color="info">Check Now</Button>
                </Link>
              </CardBody>
            </Card>
          </Col>

          <Col sm={{ size: 3}}>
            <Card>
              <CardImg top  src="/assets/images/weather.png" alt="Card image cap" />
              <CardBody>
                <CardText>Want to know the weather in your new place ? This utility helps you to get to know the weather conditions.</CardText>
                <Link to={`/weather`} >
                  <Button className="mx-auto d-block" color="info">Check Now</Button>
                </Link>
              </CardBody>
          </Card>
          </Col>

          <Col sm={{ size: 3}}>
            <Card>
              <CardImg top  src="/assets/images/costofliving.png" alt="Card image cap" />
              <CardBody>
                <CardText>Want to know the cost of various grocery products? This utility helps you to compare the cost of living of your new place with your native.</CardText>
                <Link to={`/lifestyle`} >
                  <Button className="mx-auto d-block" color="info">Check Now</Button>
                </Link>
              </CardBody>
          </Card>
          </Col>

        </Row>
      </div>
    );
  }
}
  
export default withRouter(Home);