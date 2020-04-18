import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
import './home.css'
import axios from 'axios'
import MultipleDatePicker from 'react-multiple-datepicker'
import {

  FormGroup,
  Input,
  Label,


} from 'reactstrap';
import Loader from 'react-loader-spinner'
const URL = "https://covid19-pollachi.herokuapp.com/admin/";
class details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      redirect: true,
      email: '',
      password: '',
      show: false,
      visible: false,
      userName: '',
      password: '',
      load: true,
      time: '',
      value: 1,
      active: 1,
      value_15: '',
      time_slots: [],
      market_name: '',
      market_address: '',
      load_form: false,
      switch1: true,
      show_alert: false,
      dates_values:[],
      ds:new Date(),
      market_license:'',
      time_check:[],
      full_value:[],
      check_ans:[],
       checkedItems: new Map(),


    };

        this.handleChange_med = this.handleChange_med.bind(this);

    this.submit = this.submit.bind(this);
    this.dates = this.dates.bind(this);
    this.logout = this.logout.bind(this);
    this.list = this.list.bind(this);
   
  };
  async componentDidMount() {
    this.setState({ redirect: true, load: true })
    var key = localStorage.getItem("token");

    await axios.get(URL + "get_time_slots",
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
        this.setState({ redirect: false, load: false })
        if(apiResponse.status == "200"){
          this.setState({time_check:apiResponse.data.TimeSlots})
              
          
           for(var i=0;i<apiResponse.data.TimeSlots.length;i++)
           {
        
               this.setState({full_value:[...this.state.full_value,apiResponse.data.TimeSlots[i]]})
     
         
           }

    
        }
        else{
        
          alert("Session expired, please login again");
          localStorage.clear();
          this.props.history.push("sign-in");
        }
      })
      .catch((error) => {
    
        alert("Something went wrong, please try again later");
        localStorage.clear();
        this.props.history.push("sign-in");

      })

  }

  list(){
    this.props.history.push("list");
  }
logout(){

  localStorage.clear();
  this.props.history.push("sign-in");

}
  async submit() {
    var all = [];
    this.state.checkedItems.forEach((value, key) => {
   
      if(value){
        all.push(key)
        
      }
    
   

})


var check_ans = [];
for(var i=0;i<all.length;i++){
  for(var j=0;j<this.state.full_value.length;j++){
    if(all[i] == this.state.full_value[j].time_slot_range){
  
check_ans.push(this.state.full_value[j].time_slot_id);
    }
  }
}



    if(this.state.market_name.length == 0 && this.state.market_address.length == 0){
alert("Please fill all details");

    }
    else if(this.state.market_license.length >15)
    {
      alert("Please enter valid License number");  
    }
    else{
   
      this.setState({ load_form: true })
    if (this.state.switch1 == true) {
      this.setState({ active: 1 })
    }
    if (this.state.switch1 == false) {
      this.setState({ active: 0 })
    }
    


    var key = localStorage.getItem("token");

    var str = '';
    check_ans.forEach(e => {
      str = str + e + ',';
    });
str = str.slice(0, -1); 



    var date_val = '';
    this.state.dates_values.forEach(e => {
      date_val = date_val + e + ',';
    });
 
    date_val = date_val.slice(0, -1); 

   

    let body =
    {

      market_palce_name: this.state.market_name,
      market_place_address: this.state.market_address,
      time_slot_ids: str,
      customer_max_count: this.state.value,
      active_check: this.state.active,
      market_licens:this.state.market_license,
      dates: date_val

    }

    await axios.post(URL + "AddMarketPlaces", body,
      {
        headers: {
          'x-access-token': key,
        }
      }
    ).then((apiResponse) => {

      this.setState({ load_form: false })

      if (apiResponse.data.msg == "Market-Place Added Successfully :)") {
        alert("Market places added Successfully");
        window.location.reload();
      }
      else{
        alert("Adding market place failed");
        window.location.reload();
      }
    }).catch((error) => {
      alert("Adding market place Failed");
      window.location.reload();
      this.setState({ load_form: false })
    })
  }

  }
   handleChange_med(e) {

    
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));

  }

  decrease = () => {
    this.setState({ value: this.state.value - 1 });
  }

  increase = () => {
    this.setState({ value: this.state.value + 1 });
  }
  handleSwitchChange = nr => () => {
    let switchNumber = `switch${nr}`;
    this.setState({
      [switchNumber]: !this.state[switchNumber]
    });

  }
  dates(date1)
  {
   
    var count = 0;
    for(var i=0;i<date1.length;i++)
    {
    var date = date1[i];

    var month = date.getMonth()+1;
    var monthString;
    if (month < 10) {
      monthString = '0' + month.toString();
    } else {
      monthString = month.toString();
    }
var dateString = date.getFullYear().toString() + '-' + monthString + '-' + date.getDate().toString();

this.state.dates_values[count] = dateString;
count++;
this.setState({ dates_values: this.state.dates_values })

  }

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

              visible={this.state.load}
            />
            </div>
          </center>


        ) : (
            <MDBContainer>
              <MDBRow>
                <MDBCol md="2"></MDBCol>
                <MDBCol md="8" style={{ top: '30px' }}>
                  <MDBCard>
                  <div className="text-center mb-3">
                          <MDBBtn
                            type="button"
                            gradient="blue"
                            rounded
                            className="btn-block z-depth-1a"
                            onClick={this.list}
                          >
                            Booking History
                </MDBBtn>
                        </div>
                
                    <MDBCardBody className="mx-4">
                      <div className="text-center">
                        <h3 className="dark-grey-text mb-5">
                          <strong>Shop Details</strong>
                        </h3>
                        
                  
                      </div>
                      {/* <div> */}
       <p style={{color:'red',float:'right',width:'170px'}}>All fields are mandatory</p>
       {/* </div> */}
       <br/>
                      <FormGroup>
                        <Label for="exampleavailable">Market Name</Label>
                        <Input
                          type="text"
                          name="Market Name"
                          placeholder="Market Name"

                          onChange={(event) => this.setState({ market_name: event.target.value })}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampledescription">Market Address</Label>
                        <Input type="textarea" name="Market Address"
                          rows="4"
                          onChange={(event) => this.setState({ market_address: event.target.value })}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleavailable">Market License Number</Label>
                        <Input
                          type="text"
                          name="Market License Number"
                          placeholder="Market License Number"

                          onChange={(event) => this.setState({ market_license: event.target.value })}
                        />
                      </FormGroup>
                       <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">
                          Time Slots
            </label>
            
                {this.state.time_check.map((item,i) =>
              <div>
           
            
  <label key={i}>
   <input type="checkbox"  name={item.time_slot_range} checked={this.state.checkedItems.get(item.time_slot_range)} onChange={this.handleChange_med} />
            {'       '}  {item.time_slot_range}
             
            </label>
            </div>
                      
                              )}
                        </div>
                    
                      <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">
                        Market place date (You are also allowed to select multiple dates)
            </label>
            <div>
                      <MultipleDatePicker value={this.state.ds} onSubmit={date=>this.dates(date)} minDate={new Date()} />
                      </div>
                      </div>
                  

                      <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">
                         Maximum number of people allowed per timeslot
            </label>
                        <div className="def-number-input number-input">
                          {this.state.value > 0 ?
                            <button onClick={this.decrease} className="minus"></button>
                            :
                            null
                          }
                          <input className="quantity" name="quantity" value={this.state.value} 
                            type="number" />
                          <button onClick={this.increase} className="plus"></button>
                        </div>
                      </div>



                
                      <center> <Loader
                        type="ThreeDots"
                        color="#3872C1"
                        height={100}
                        width={100}

                        visible={this.state.load_form}
                      /></center>
                      <div>

                        <div className="text-center mb-3">
                          <MDBBtn
                            type="button"
                            gradient="blue"
                            rounded
                            className="btn-block z-depth-1a"
                            onClick={this.submit}
                          >
                            Submit
                </MDBBtn>
                        </div>
                      </div>
                   
                
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
    );
  };
}

export default details;