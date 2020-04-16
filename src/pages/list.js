import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol ,MDBContainer, MDBRow} from 'mdbreact';
import DatePicker from "react-datepicker";
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css";
import shop from '../assests/img/shop.jpg'
import './home.css'
import {

  FormGroup,
  Input,
  Label,
  Col


} from 'reactstrap';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
const URL = "http://localhost:5555/admin/";
class list extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    startDate: new Date(),
    list:[],
    list_time:[],
  };
}
async componentDidMount(){
  var key = localStorage.getItem("token");
  await axios.get(URL + "ALL_MarketPlace_List?on_date=2020-04-16",
  {
    headers: {
      'x-access-token': key,
    }
  }).then((apiResponse) => {
console.log(apiResponse.data.TotalMarketPlaceList[0])
  this.setState({list:apiResponse.data.TotalMarketPlaceList})
  this.setState({list_time:apiResponse.data.TotalMarketPlaceList[0].time_data})
  console.log(this.state.list_time)
  })
  .catch((error) => {
console.log(error)

  })
}
handleChange = date => {
  this.setState({
    startDate: date
  });
  console.log(this.state.startDate)
};
render() {
  return (
    <MDBContainer>
    <MDBRow>
  
      <MDBCol md="12" style={{ top: '70px'}}>
        <MDBCard>
          <MDBCardBody className="mx-4">
            <div className="text-center">
              <h3 className="dark-grey-text mb-5">
                <strong>Market Place List</strong>
              </h3>
            </div>
            <div>
              <center>
              <FormGroup>
                        <Label for="exampleavailable">Select Date</Label>
                      {'          '}
            <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
      />
      </FormGroup>
      </center>
      </div>
            <MDBRow >
            {this.state.list.map((item,i) =>
            <Col sm="4" style={{paddingTop:'4%'}}>
              
                <div>
          
      <Card>
        <CardImg top width="100%" src={shop} alt="Card image cap" />
        <CardBody>
          <b>
            <CardTitle key={i}>{item.market_palce_name}{', '}
            <i>{item.market_place_address}</i></CardTitle>
            </b>
       
          <CardText key={i}>
            
            Customer Count : {item.customer_max_count}</CardText>
            {/* {this.state.list_time.map((item,i) =>
            <CardSubtitle key={i}>{item}</CardSubtitle>
            )} */}
          {/* <Button>Button</Button> */}
        </CardBody>
        <div class="rounded-bottom mdb-color lighten-3 text-center pt-3">
    <ul class="list-unstyled list-inline font-small">
      <li class="list-inline-item pr-2 white-text"><i class="far fa-clock pr-1"></i>05/10/2015</li>
      <li class="list-inline-item pr-2"><a href="#" class="white-text"><i
            class="far fa-comments pr-1"></i>12</a></li>
      <li class="list-inline-item pr-2"><a href="#" class="white-text"><i class="fab fa-facebook-f pr-1">
          </i>21</a></li>
      <li class="list-inline-item"><a href="#" class="white-text"><i class="fab fa-twitter pr-1"> </i>5</a></li>
    </ul>
  </div>
      </Card>

    </div>
                 
               
            
    </Col>
    

              
            )}
          </MDBRow>
          </MDBCardBody>
          </MDBCard>
          
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}
}

export default list;


