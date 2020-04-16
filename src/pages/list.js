import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText,MDBIcon, MDBCol ,MDBContainer, MDBRow} from 'mdbreact';
import DatePicker from "react-datepicker";
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css";
import shop from '../assests/img/shop.jpg'
import './home.css'
import Loader from 'react-loader-spinner'
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
const URL = "https://covid19-pollachi.herokuapp.com/admin/";
class list extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    startDate: new Date(),
    list:[],
    list_time:[],
    load:false,
    redirect:true,
    load1:true
  };
  this.logout = this.logout.bind(this);
  this.back = this.back.bind(this);
}

async componentDidMount(){
  this.setState({load:true,redirect:true,load1:true})
  var key = localStorage.getItem("token");

  var date = new Date();

  var month = date.getMonth()+1;
  var monthString;
  if (month < 10) {
    monthString = '0' + month.toString();
  } else {
    monthString = month.toString();
  }
var dateString = date.getFullYear().toString() + '-' + monthString + '-' + date.getDate().toString();
// this.setState({dates_values:dateString})
// this.setState({
//   dates_values: [...this.state.dates_values, dateString]
// })

  await axios.get(URL + "ALL_MarketPlace_List?on_date="+dateString,
  {
    headers: {
      'x-access-token': key,
    }
  }).then((apiResponse) => {
    if (apiResponse.data.token == "expired") {
      alert("Token Expired, Please login again");
      localStorage.clear();
      this.props.history.push("sign-in");
    }

    this.setState({load:false,load1:false,redirect:false})
    if(apiResponse.status == "200"){

  this.setState({list:apiResponse.data.TotalMarketPlaceList})
  this.setState({list_time:apiResponse.data.TotalMarketPlaceList[0].time_data})

    }
    else{

      alert("No market details added for this date")

    }
  })
  .catch((error) => {
    this.setState({load:false,load1:false,redirect:false})
  
    alert("No market details added for this date")
  


  })
}
handleChange = async(date) => {
  this.setState({load:true})
  this.setState({
    startDate: date
  });

  var date = date;

  var month = date.getMonth()+1;
  var monthString;
  if (month < 10) {
    monthString = '0' + month.toString();
  } else {
    monthString = month.toString();
  }
var dateString = date.getFullYear().toString() + '-' + monthString + '-' + date.getDate().toString();
var key = localStorage.getItem("token");
  await axios.get(URL + "ALL_MarketPlace_List?on_date="+dateString,
  {
    headers: {
      'x-access-token': key,
    }
  }).then((apiResponse) => {
    if (apiResponse.data.token == "expired") {
      alert("Token Expired, Please login again");
      localStorage.clear();
      this.props.history.push("sign-in");
    }
    this.setState({load:false})
    if(apiResponse.status == "200"){

  this.setState({list:apiResponse.data.TotalMarketPlaceList})

    }
    else{
      alert("No market details added for this date")
    }
  })
  .catch((error) => {
    this.setState({load:false})
    alert("No market details added for this date")


  })
};
logout(){

  localStorage.clear();
          this.props.history.push("sign-in");

}
back(){
  this.props.history.push("details");
}
render() {
  return (
    <div>
    {this.state.redirect ? (
      <center>
        <div style={{paddingTop:'20%'}}><Loader
          type="ThreeDots"
          color="#3872C1"
          height={100}
          width={100}

          visible={this.state.load1}
        />
        </div>
      </center>


    ) : (
    <MDBContainer>
    <MDBRow>
  
      <MDBCol md="12" style={{ top: '70px'}}>
        <MDBCard>
        <div className="text-center mb-3">
                          <MDBBtn
                            type="button"
                            gradient="blue"
                            rounded
                            className="btn-block z-depth-1a"
                            onClick={this.back}
                          >
                           Back
                </MDBBtn>
                        </div>
                      
        {/* <div className="row my-3 d-flex justify-content-center">
<MDBBtn
  type="button"
  color="white"
  rounded
  className="mr-md-3 z-depth-1a"
>
  <MDBIcon fab className="blue-text text-center" onClick={this.back} ><b>Back</b></MDBIcon>
</MDBBtn>
</div>
        <div className="row my-3 d-flex justify-content-center">
<MDBBtn
  type="button"
  color="white"
  rounded
  className="mr-md-3 z-depth-1a"
>
  <MDBIcon fab className="blue-text text-center" onClick={this.logout} ><b>Logout</b></MDBIcon>
</MDBBtn>
</div> */}
          <MDBCardBody className="mx-4">
            <div className="text-center">
              <h3 className="dark-grey-text mb-5">
                <strong>Market Place List</strong>
              </h3>
            </div>
            <div>
              <center>
              <FormGroup>
                        <Label for="exampleavailable">Pick a date to view list of market available today </Label>
                      {'          '}
            <DatePicker
        selected={this.state.startDate}
        // onChange={this.handleChange}
        onSelect={this.handleChange}
      />
      </FormGroup>
      </center>
      </div>
      <center>
            <div style={{paddingTop:'2%'}}><Loader
              type="ThreeDots"
              color="#3872C1"
              height={100}
              width={100}

              visible={this.state.load}
            />
            </div>
          </center>
            <MDBRow >
            {this.state.list.map(
                  ({ market_palce_name, market_place_address,customer_max_count,time_data }) => (
            <Col sm="4" style={{paddingTop:'4%'}}>
              
                <div>
          
      <Card>
        <CardImg top width="100%" src={shop} alt="Card image cap" />
        <CardBody>
          <b>
            <CardTitle >{market_palce_name}{', '}
            <i>{market_place_address}</i></CardTitle>
            </b>
       
          <CardText >
            
            Maximum Customer Count per Time-slot: <b>{customer_max_count}</b></CardText>

         
            {/* <p key={i}>
               {this.time_data.map((prese,i1) => {
        <p key={i1}>{prese}</p>
      })}
      </p> */}
            {/* {this.state.list_time.map((item,i) =>
            <CardSubtitle key={i}>{item}</CardSubtitle>
            )} */}
          {/* <Button>Button</Button> */}
        </CardBody>
        <div class="rounded-bottom mdb-color lighten-3 text-center pt-3">
    <ul class="list-unstyled list-inline font-small">
    {time_data.map((item,i) =>
            
           
      <li class="list-inline-item pr-2 white-text" key={i}><i class="far fa-clock pr-1"></i>{item.time_slot_range}</li>
      )}
      {/* <li class="list-inline-item pr-2"><a href="#" class="white-text"><i
            class="far fa-comments pr-1"></i>12</a></li>
      <li class="list-inline-item pr-2"><a href="#" class="white-text"><i class="fab fa-facebook-f pr-1">
          </i>21</a></li>
      <li class="list-inline-item"><a href="#" class="white-text"><i class="fab fa-twitter pr-1"> </i>5</a></li> */}
    </ul>
  </div>
      </Card>

    </div>
                 
               
            
    </Col>
    
            ),
              
            )}
          </MDBRow>
          </MDBCardBody>
          <div className="text-center mb-3">
                          <MDBBtn
                            type="button"
                            gradient="blue"
                            rounded
                            className="btn-block z-depth-1a"
                            onClick={this.logout}
                          >
                            Logout
                </MDBBtn>
                        </div>
          </MDBCard>
          
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    )}
    </div>
  )
}
}

export default list;


