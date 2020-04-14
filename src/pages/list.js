import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import shop from '../assests/img/shop.jpg'
const CardExample = () => {
  return (
    <div>
      <center>
    <p>Shop Details</p></center>
    <MDBCol style={{ maxWidth: "22rem",padding:'20px' }}>
      <MDBCard>
        <MDBCardImage className="img-fluid" src={shop}
          waves />
        <MDBCardBody>
          <MDBCardTitle>Card title</MDBCardTitle>
          <MDBCardText>Some quick example text to build on the card title and make up the bulk of the card's content.</MDBCardText>
          <MDBBtn href="#">Click</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
    </div>
  )
}

export default CardExample;