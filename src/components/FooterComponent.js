import React from 'react';

//Functional Component
function Footer() {
  return (
    <div className="footer fixed-bottom">
      <div class="container">
        <div class="row">
          <div class="col-7 col-sm-6">
            <ul className="list-unstyled">
              <li><a href="https://www.instagram.com/harshithasv/?hl=en"> <i className="fa fa-2x fa-instagram"></i></a></li>
              <li><a href="https://www.linkedin.com/in/harshitha-s-v-86a34ab3/"><i className="fa fa-2x fa-linkedin"></i></a></li>
              <li><a href="https://github.com/HarshithaSolai"><i className="fa fa-2x fa-github"></i></a></li>
              <li> <a href="mailto:solaiharshitha0@gmail.com"><i className="fa fa-2x fa-envelope"></i></a></li>
            </ul>
          </div>
          <div class="col-5 col-sm-6 align-self-center">
            <p>Developed with <i className="fa fa fa-heart"></i> by <a href="https://harshithasv.netlify.com"> <strong>Harshi</strong></a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;