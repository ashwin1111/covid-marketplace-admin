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
      isGoing1: false,
      isGoing2: false,
      isGoing3: false,
      isGoing4: false,
      isGoing5: false,
      time1: '',
      time2: '',
      time3: '',
      time4: '',
      time5: '',
      time11: '',
      time12: '',
      time13: '',
      time14: '',
      time15: '',
      value: 1,
      value_11: '',
      value_12: '',
      value_13: '',
      value_14: '',
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
      market_license:''


    };
    this.handleInputChange1 = this.handleInputChange1.bind(this);
    this.handleInputChange2 = this.handleInputChange2.bind(this);
    this.handleInputChange3 = this.handleInputChange3.bind(this);
    this.handleInputChange4 = this.handleInputChange4.bind(this);
    this.handleInputChange5 = this.handleInputChange5.bind(this);
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
        this.setState({ time1: apiResponse.data.TimeSlots[0].time_slot_range })
        this.setState({ time11: apiResponse.data.TimeSlots[0].time_slot_id })
        this.setState({ time2: apiResponse.data.TimeSlots[1].time_slot_range })
        this.setState({ time12: apiResponse.data.TimeSlots[1].time_slot_id })
        this.setState({ time3: apiResponse.data.TimeSlots[2].time_slot_range })
        this.setState({ time13: apiResponse.data.TimeSlots[2].time_slot_id })
        this.setState({ time4: apiResponse.data.TimeSlots[3].time_slot_range })
        this.setState({ time14: apiResponse.data.TimeSlots[3].time_slot_id })
        this.setState({ time5: apiResponse.data.TimeSlots[4].time_slot_range })
        this.setState({ time15: apiResponse.data.TimeSlots[4].time_slot_id })
        }
        else{
        
          alert("Session expired, please login again");
          localStorage.clear();
          this.props.history.push("sign-in");
        }
      })
      .catch((error) => {
        console.log(error);
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

    if(this.state.market_name.length == 0 && this.state.market_address.length == 0){
alert("Please Fill all Details");

    }
    else if(this.state.market_license.length >15)
    {
      alert("Please Enter Valid License Number");  
    }
    else{
   
      this.setState({ load_form: true })
    if (this.state.switch1 == true) {
      this.setState({ active: 1 })
    }
    if (this.state.switch1 == false) {
      this.setState({ active: 0 })
    }
    var index = 0;
    if (this.state.value_11 == true) {

      var tim = this.state.time11
      this.state.time_slots[index] = tim;
      index++;
      this.setState({ time_slots: this.state.time_slots })

    }

    if (this.state.value_12 == true) {


      var tim1 = this.state.time12
      this.state.time_slots[index] = tim1;
      index++;
      this.setState({ time_slots: this.state.time_slots })

      // this.setState({
      //   time_slots: [...this.state.time_slots, tim1]
      // })
    }
    if (this.state.value_13 == true) {

      var tim2 = this.state.time13
      this.state.time_slots[index] = tim2;
      index++;
      this.setState({ time_slots: this.state.time_slots })

    }
    if (this.state.value_14 == true) {

      var tim3 = this.state.time14
      this.state.time_slots[index] = tim3;
      index++;
      this.setState({ time_slots: this.state.time_slots })

    }
    if (this.state.value_15 == true) {

      var tim4 = this.state.time15
      this.state.time_slots[index] = tim4;
      index++;
      this.setState({ time_slots: this.state.time_slots })

    }


    var key = localStorage.getItem("token");

    var str = '';
    this.state.time_slots.forEach(e => {
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
        alert("Market Places Added Successfully");
        window.location.reload();
      }
      else{
        alert("Adding Market Place Failed");
        window.location.reload();
      }
    }).catch((error) => {
      alert("Adding Market Place Failed");
      window.location.reload();
      this.setState({ load_form: false })
    })
  }

  }


  handleInputChange1(event) {
    const target = event.target;
    const value_1 = target.name === 'isGoing1' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value_1
    });

    this.setState({ value_11: value_1 })



  }
  handleInputChange2(event) {
    const target = event.target;
    const value_2 = target.name === 'isGoing2' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value_2
    });

    this.setState({ value_12: value_2 })

  }
  handleInputChange3(event) {
    const target = event.target;
    const value_3 = target.name === 'isGoing3' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value_3
    });

    this.setState({ value_13: value_3 })

  }
  handleInputChange4(event) {
    const target = event.target;
    const value_4 = target.name === 'isGoing4' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value_4
    });

    this.setState({ value_14: value_4 })

  }
  handleInputChange5(event) {
    const target = event.target;
    const value_5 = target.name === 'isGoing5' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value_5
    });

    this.setState({ value_15: value_5 })

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
// this.setState({dates_values:dateString})
// this.setState({
//   dates_values: [...this.state.dates_values, dateString]
// })
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
                        <div>
                          <input
                            name="isGoing1"
                            type="checkbox"
                            checked={this.state.isGoing1}
                            onChange={this.handleInputChange1} />{'     '}<label htmlFor="exampleFormControlTextarea1">
                            {this.state.time1}
                          </label>
                        </div>
                        <div>
                          <input
                            name="isGoing2"
                            type="checkbox"
                            checked={this.state.isGoing2}
                            onChange={this.handleInputChange2} />{'     '}<label htmlFor="exampleFormControlTextarea1">
                            {this.state.time2}
                          </label>
                        </div>
                        <div>
                          <input
                            name="isGoing3"
                            type="checkbox"
                            checked={this.state.isGoing3}
                            onChange={this.handleInputChange3} />{'     '}<label htmlFor="exampleFormControlTextarea1">
                            {this.state.time3}
                          </label>
                        </div>
                        <div>
                          <input
                            name="isGoing4"
                            type="checkbox"
                            checked={this.state.isGoing4}
                            onChange={this.handleInputChange4} />{'     '}<label htmlFor="exampleFormControlTextarea1">
                            {this.state.time4}
                          </label>
                        </div>
                        <div>
                          <input
                            name="isGoing5"
                            type="checkbox"
                            checked={this.state.isGoing5}
                            onChange={this.handleInputChange5} />{'     '}<label htmlFor="exampleFormControlTextarea1">
                            {this.state.time5}
                          </label>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">
                        Market place date (You are also allowed to select multiple dates)
            </label>
            <div>
                      <MultipleDatePicker placeholder="Select Date" value={this.state.ds} onSubmit={date=>this.dates(date)} minDate={new Date()} />
                      </div>
                      </div>
                      {/* <MultipleDatePicker
                    
    onSubmit={dates => 
      var date = new Date();
      var month = date.getMonth()+1;
      var monthString;
      if (month < 10) {
        monthString = '0' + month.toString();
      } else {
        monthString = month.toString();
      }
  var dateString = date.getFullYear().toString() + '-' + date.getDate().toString() + '-' + monthString;
  console.log(dateString);
      console.log('selected date', dates)}
  /> */}

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
                          <input className="quantity" name="quantity" value={this.state.value} onChange={() => console.log('change')}
                            type="number" />
                          <button onClick={this.increase} className="plus"></button>
                        </div>
                      </div>


                      {/* <div className='custom-control custom-switch'>

                        <input
                          type='checkbox'
                          className='custom-control-input'
                          id='customSwitches'
                          checked={this.state.switch1}
                          onChange={this.handleSwitchChange(1)}
                          readOnly
                        />
                        <label className='custom-control-label' htmlFor='customSwitches'>
                          Set as Active
        </label>

                      </div> */}

                
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
                      {/* <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">

{'&'}
</p> */}

{/* <div className="row my-3 d-flex justify-content-center">
<MDBBtn
  type="button"
  color="white"
  rounded
  className="mr-md-3 z-depth-1a"
>
  <MDBIcon fab className="blue-text text-center" onClick={this.list}><b>See Market place details</b></MDBIcon>
</MDBBtn>
</div> */}
                
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