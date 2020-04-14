import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
import './home.css'
import axios from 'axios'
import {

Alert,
 
} from 'reactstrap';
import Loader from 'react-loader-spinner'
const URL="http://localhost:5555/admin/";
class home extends React.Component {
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
      load:false
    
    };
    this.login= this.login.bind(this);
  };
  componentDidMount(){

  }
  getLoginData = (value, type) =>{
    this.setState({
      [type]: value
    });
 
  }
  async login(){
    
  
    let body =
    {
      userid: this.state.userName,
      password:this.state.password
    }
    if(this.state.userName.length > 0 && this.state.password.length > 0){
      this.setState({load:true})
   
     
      await axios.post(URL+"AdminLogin",{
        userid: this.state.userName,
      password:this.state.password
      }).then((apiResponse) => {
        this.setState({load:false})

        localStorage.setItem("token", apiResponse.data.token);
        var key = localStorage.getItem("token");
     
        if(apiResponse.data.msg == "Login success :)"){
          this.props.history.push("details");
        }
        })
        .catch((error) =>{
       
        this.setState({load:false})
        this.setState({visible:true})
              if(this.state.visible){

        setTimeout(
          function() {
         
            this.setState({visible:false})
          }
          .bind(this),
          2000
      );
      }
        })
     
    }
  


  }
  render() {
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="3"></MDBCol>
        <MDBCol md="6" style={{ top: '70px'}}>
          <MDBCard>
            <MDBCardBody className="mx-4">
              <div className="text-center">
                <h3 className="dark-grey-text mb-5">
                  <strong>Log in</strong>
                </h3>
              </div>
              <MDBInput
                label="Username"
                group
                type="text"
                validate
                getValue={value => this.getLoginData(value, "userName")}
              />
              <MDBInput
                label="Password"
                group
                type="password"
                validate
                containerClass="mb-0"
                getValue={value => this.getLoginData(value, "password")}
              />
              <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
    Incorrect Username or Password
    </Alert><center> <Loader
         type="ThreeDots"
         color="#3872C1"
         height={100}
         width={100}
       
 visible={this.state.load}
      /></center>
    
              {/* <p className="font-small blue-text d-flex justify-content-end pb-3">
                Forgot
                <a href="#!" className="blue-text ml-1">

                  Password?
                </a>
              </p> */}
              <div className="text-center mb-3">
                <MDBBtn
                  type="button"
                  gradient="blue"
                  rounded
                  className="btn-block z-depth-1a"
                  onClick={this.login}
                >
                  Login
                </MDBBtn>
              </div>
             
              <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">

                or Sign in with:
              </p>
              <div className="row my-3 d-flex justify-content-center">
                <MDBBtn
                  type="button"
                  color="white"
                  rounded
                  className="mr-md-3 z-depth-1a"
                >
                  <MDBIcon fab icon="facebook-f" className="blue-text text-center" />
                </MDBBtn>
                <MDBBtn
                  type="button"
                  color="white"
                  rounded
                  className="mr-md-3 z-depth-1a"
                >
                  <MDBIcon fab icon="twitter" className="blue-text" />
                </MDBBtn>
                <MDBBtn
                  type="button"
                  color="white"
                  rounded
                  className="z-depth-1a"
                >
                  <MDBIcon fab icon="google-plus-g" className="blue-text" />
                </MDBBtn>
              </div>
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

export default home;