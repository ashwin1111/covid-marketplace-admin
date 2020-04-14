import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard,MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
import { MDBDatePicker } from 'mdbreact';
import './home.css'
import axios from 'axios'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
Row,
  FormGroup,
Alert,
  Input,
  Label,


} from 'reactstrap';
import Loader from 'react-loader-spinner'
const URL="http://localhost:5555/admin/";
class details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
      redirect:false,
      email:'',
      password:'',
      show:false,
      visible:false,
      userName:'',
      password:'',
      load:false,
      time:'',
    
    };
    this.login= this.login.bind(this);
  };
  async componentDidMount(){
 
    var key = localStorage.getItem("token");
    console.log(key);
    await axios.get(URL+"get_time_slots",
    {
        headers: {
          'x-access-token': key,
        }
      }).then((apiResponse) => {
     console.log(apiResponse.data.TimeSlots)
     this.setState({time:apiResponse.data.TimeSlots})
    //  const time=this.state.time;
     console.log(this.state.time)
        })
        .catch((error) =>{
     
        
        })
     
  }
//   getLoginData = (value, type) =>{
//     this.setState({
//       [type]: value
//     });
 
//   }
  
  
//   getPickerValue = (value) => {
//     console.log(value);
//   }
  async login(){
    
  
    let body =
    {
      userid: this.state.userName,
      password:this.state.password
    }
    if(this.state.userName.length > 0 && this.state.password.length > 0){
      this.setState({load:true})
      console.log(this.state.userName)
     
      await axios.post(URL+"AdminLogin",{
        userid: this.state.userName,
      password:this.state.password
      }).then((apiResponse) => {
        this.setState({load:false})

        localStorage.setItem("token", apiResponse.data.token);
        var key = localStorage.getItem("token");
     
        if(apiResponse.data.msg == "Login success :)"){
          this.props.history.push("list");
        }
        })
        .catch((error) =>{
          // console.log(error)
        this.setState({load:false})
        this.setState({visible:true})
              if(this.state.visible){
        // console.log("work")
        setTimeout(
          function() {
            // console.log("Working")
            this.setState({visible:false})
          }
          .bind(this),
          2000
      );
      }
        })
     
    }
    // else {
    //   this.setState({visible:true})
   
    //   if(this.state.visible){
    //     // console.log("work")
    //     setTimeout(
    //       function() {
    //         // console.log("Working")
    //         this.setState({visible:false})
    //       }
    //       .bind(this),
    //       2000
    //   );
    //   }
    // }


  }
  render() {
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="2"></MDBCol>
        <MDBCol md="8" style={{ top: '30px'}}>
          <MDBCard>
            <MDBCardBody className="mx-4">
              <div className="text-center">
                <h3 className="dark-grey-text mb-5">
                  <strong>Shop Details</strong>
                </h3>
              </div>
              {/* <MDBInput label="Example label" outline size="sm" />
              <MDBInput type="textarea" label="Example label" outline /> */}
              <div className="form-group">
      <label htmlFor="formGroupExampleInput">Market Name</label>
      <input
        type="text"
        className="form-control"
        id="formGroupExampleInput"
      />
    </div>
  
              <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">
            Market Address
            </label>
            <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="5"
            />
        </div>
        {/* {this.state.time.map((item,i) =>
          <div> 
          <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="defaultIndeterminate" checked/>
          <label class="custom-control-label" for="defaultIndeterminate" key={i}>{item.time_slot_range}</label>
        </div>
        </div>
       
        )} */}
      
    
             
              {/* <p className="font-small blue-text d-flex justify-content-end pb-3">
                Forgot
                <a href="#!" className="blue-text ml-1">

                  Password?
                </a>
              </p> */}
             
            </MDBCardBody>
            {/* <MDBModalFooter className="mx-5 pt-3 mb-1">
              <p className="font-small grey-text d-flex justify-content-end">
                Not a member?
                <a href="#!" className="blue-text ml-1">

                  Sign Up
                </a>
              </p>
            </MDBModalFooter> */}
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
}

export default details;