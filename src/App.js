import React from 'react';

import './App.css';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,

  FormGroup,

  Input,
  Label,

} from 'reactstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
   
    };
 
  };

  render() {
  
    return (
    <div>
   
         <Col xl={8} lg={12} md={12} style={{ margin: 'auto',
  width: '90%',maxWidth:'620px',padding:'45px 0',}}>
          <Card>
            <CardHeader>Shop Details</CardHeader>
            <CardBody>
              <Form >
             
                <FormGroup>
                  <Label for="exampletitle">Shop Name</Label>
                  <Input
                    type="text"
                    name="tilte"
                    placeholder="shop Name"
                
                    onChange={(event) => this.setState({shop_name: event.target.value})}
                    onChange={this.handleChangeval}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleaddress">Address</Label>
                  <Input type="textarea" name="textaddress" 
                  onChange={(event) => this.setState({shop_address: event.target.value})}
                  />
                </FormGroup>
 
   
                

                <FormGroup>
                  <Label for="exampledate">Date</Label>
                  <Input
                    type="date"
                    name="date"
                    id="exampleDate"
                    placeholder="Date"
                    onChange={(event) => this.setState({startDate: event.target.value})}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampledate">Time</Label>
                  <Input
                    type="time"
                    name="time"
                    id="exampletime"
                    placeholder="Time"
                    onChange={(event) => this.setState({startTime: event.target.value})}
                  />
                </FormGroup>
             
                <FormGroup>
                  <Label for="exampledescription">Description</Label>
                  <Input type="textarea" name="textdescription"
                  onChange={(event) => this.setState({description: event.target.value})}
                  />
                </FormGroup>
                
             
                <center><Button color="primary" onClick={this.handleSubmitval} active>
                Submit
                </Button>
                </center>
              </Form>
            </CardBody>
          </Card>
        </Col>

        
        </div>
    );
  }
}




export default App;
