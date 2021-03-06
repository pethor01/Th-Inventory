import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBCardBody, MDBCardText,  MDBCardTitle } from "mdbreact";
import { useLocation } from 'react-router'

export default  () => (
  <>
  <Navbar location={useLocation().pathname}/>
  <MDBContainer className="mt-5 text-center">
    <MDBRow>
      <MDBCol>
        <MDBJumbotron>
          <MDBCardBody>
            <MDBCardTitle className="h2">
              Material Design for Bootstrap
            </MDBCardTitle>
            <p className="blue-text my-4 font-weight-bold">
              Powerful and free Material Design UI KIT
            </p>
            <MDBCardText>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga
              aliquid dolorem ea distinctio exercitationem delectus qui, quas
              eum architecto, amet quasi accusantium, fugit consequatur
              ducimus obcaecati numquam molestias hic itaque accusantium
              doloremque laudantium, totam rem aperiam.
            </MDBCardText>
            <hr className="my-4" />
            <div className="pt-2">
              <MDBBtn
                color="primary"
                className="waves-effect"
              >
                Buy now <MDBIcon far icon="gem" />
              </MDBBtn>
              <MDBBtn
                to={'/stores'}
                className="waves-effect"
                role="button"
              > 
                ViewStore  
              </MDBBtn>
            </div>
          </MDBCardBody>
        </MDBJumbotron>
      </MDBCol>
    </MDBRow>
</MDBContainer>
</>
)