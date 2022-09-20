import * as React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
 
class AddStudent extends React.Component {
  constructor(props) {
    super(props);
    //Neccessary information to post and communicate errors/success
    this.state={ name:'',uEmail:'', message:'' };
  }
  
  
  handleSubmit = () => {
    //Do not accept incomplete data
    if ( this.state.name == '' || this.state.uEmail == '' )  {  
        this.setState({message: 'Enter complete info'});
        return;
    }
    //Call the POST to backend
    fetch('http://localhost:8080/student/add',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.uEmail,     
      })
    }) //Now update message for the response from backend
      .then(response => response.json() )
      .then(responseData => {
        const { message } = responseData;
        this.setState({ 
          message: message 
        });
      })
      .catch(err => console.error(err))
  }
   
 
  
  handleChange = (event) =>  {
     this.setState({[event.target.name]: event.target.value});
  }
  
  render() {
    const { name, uEmail, message } = this.state;
    return (
      <div>
        <h3>Add a New Student </h3>

        <TextField autoFocus style = {{width:400}} 
             label="New Student's Name" name="name" 
             onChange={this.handleChange}  value={name} /> 
        <br/> <br/>
        <TextField style = {{width:400}} label="New Students's Unique Email" name="uEmail" 
             onChange={this.handleChange}  value={uEmail} /> 
        <br/> <br/>
        <Button variant="outlined" color="primary" style={{margin: 10}}
             onClick={this.handleSubmit} >Add Student</Button>
        <h3>{message}</h3>
      </div>
      ); 
  }
}
export default AddStudent; 
