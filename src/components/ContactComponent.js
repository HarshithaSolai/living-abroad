import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Media, Card, CardBody, CardHeader } from 'reactstrap';

class LifeStyle extends Component {
  render() {
    return (
      <div className="container">
        <div className="row row-content card-view">
          <div className="col-12 col-sm-6 self-align-center">
            <Media object src='/assets/images/title.png' alt='title' />
          </div>
          <div className="contact col-12 col-sm-6 text-center">
            <Card>
              <CardHeader className="bg-info text-white">
                Know more about Me
              </CardHeader>
              <CardBody>
                <dl className="row p-1">
                  <dt className="col-6">Name : </dt>
                  <dd className="col-6">Harshitha</dd>
                  <dt className="col-6">Email : </dt>
                  <dd className="col-6"><a href="mailto:solaiharshitha0@gmail.com" target="_blank">solaiharshitha0@gmail.com</a></dd>
                  <dt className="col-6">Website : </dt>
                  <dd className="col-6"><a href="https://www.harshithasv.netlify.com" target="_blank">www.harshithasv.netlify.com</a></dd>
                  <dt className="col-6">Social Platforms : </dt>
                  <dd className="col-6">
                    <li><a href="https://www.instagram.com/harshithasv/?hl=en"> <i className="fa fa-2x fa-instagram"></i></a></li>
                    <li><a href="https://www.linkedin.com/in/harshitha-s-v-86a34ab3/"><i className="fa fa-2x fa-linkedin"></i></a></li>
                    <li><a href="https://github.com/HarshithaSolai"><i className="fa fa-2x fa-github"></i></a></li>
                  </dd>
                </dl>
                <blockquote className="blockquote">
                  <p className="mb-0">
                    I am an Indian (from Bangalore) recently relocated to Amsterdam (Netherlands) accompanying my partner.
                  </p>
                </blockquote>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LifeStyle);
