import { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      phone: "",
      email: "",
      newList: [],
      status: false, 
      selectedId:"",
      
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, phone, email, newList } = this.state;
    const enterDetails = {
      Name: name,
      Phone: phone,
      Email: email,
      id: newList.length, 

    };
    newList.push(enterDetails);

    this.setState((prevState) => ({
      name: "",
      phone: "",
      email: "",
    }));
  };

  deleteRowTable = (Id) => {
    const { name, phone, email, newList } = this.state;
    const filteredColumn = newList.filter((each) => each.id !== Id);
    this.setState({ newList: filteredColumn });
  };

  editButton=(Id)=>{ 
    const { name, phone, email, newList,status } = this.state;
   const informationFilter=newList.filter((each)=>(each.id===Id)) 
   const {Name,Phone,Email}=(informationFilter[0]) 
   this.setState({name:Name,phone:Phone,email:Email,status:true,selectedId:Id})
  } 

  updatingValues=()=>{
    const { name, phone, email, newList, status,selectedId } = this.state;  
      // this.setState({name:"",phone:"",email:"", status: false });
     console.log({name,phone,email})
     
     console.log(selectedId)  
     const new1 = { Name:name, Phone:phone, Email:email,id:selectedId };
     newList.splice(selectedId, 1, new1);
     const ameeno=[...newList] 
     this.setState({newList:ameeno,name:"",phone:"",email:"", status: false})
     
  }

  render() {
    const { name, phone, email, newList, status } = this.state;
    console.log(newList)
    return (
      <div className="App">
        <div className="Form">
          <form onSubmit={this.handleSubmit}>
            <label>Name:</label>
            <br />
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
            <br />
            <label>phone:</label>
            <br />
            <input
              type="text"
              name="phone"
              value={this.state.phone}
              onChange={this.handleInputChange}
            />
            <br />
            <label>Email:</label>
            <br />
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
            <br />
            {status ? (
              ""
            ) : (
              <button type="submit" >Add</button>
            )}
          </form> 
          {status?<button onClick={this.updatingValues}>Update</button>:""}
         
        </div>
        <table className="table">
          <tr>
            <th>Sr.no</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
          {/* <EditText
            name="email"
            type="email"
            style={{ width: "200px" }}
            defaultValue="email@domain.com"
            inline
          /> */}
          {newList.map((each) => {
            return (
              <tr key={each.id}>
                <th className="view">{each.id}</th>
                <th className="view">
                  {each.Name} 
                </th>
                <th className="view">
                  {each.Phone} 
                </th>
                <th className="view" editButtonContent>
                  {each.Email}
                </th>
                <th>
                  <button
                    onClick={() => {
                      this.deleteRowTable(each.id);
                    }}
                  >
                    Delete
                  </button>
                  /
                  <button
                    onClick={() => {
                      this.editButton(each.id);
                    }}
                  >
                    Edit
                  </button>
                </th>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}

export default App;


