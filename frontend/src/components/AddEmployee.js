import React,{useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import Header from '../components/Header';
import { useNavigate } from "react-router-dom";



 function AddEmployee(){
  
  let [name, setName] = useState("");
  const [fullname,setFullname] = useState("");
  const [nic,setNic] = useState("");
  const [address,setAddress] = useState("");
  const [gender,setGender] = useState("");
  const [age,setAge] = useState("");
  const [bdate,setBday] = useState("");
  const [email,setEmail] = useState("");
  const [conactNum,setContactNum] = useState("");
  const [department,setDepartment] = useState("");
  const [basicSalary,setBasicSalary] = useState("");
  const [totalSalary,setTotalSalary] = useState("");
  const navigate = useNavigate();

  const [qualification,setQualification] = useState("");

  const [invalidInput, setInvalidInput] = useState(false);

  const handleInputChange = (e) => {
    const input = e.target.value;
    const regex = /^[0-9\b]+$/;
    if (input === '' || regex.test(input)) {
      setContactNum(input);
      if (input.length < 10) {
        setInvalidInput(true);
      } else {
        setInvalidInput(false);
      }
    }
  }

  //salary
  function getBasicSalary(department) {
    switch (department) {
      case 'Service Attendant':
        return '10000';
      case 'Technician':
        return '20000';
      case 'Manager':
        return '40000';
      case 'Supervisor':
        return '30000';
      case 'Engineer':
        return '50000';
      default:
        return '';
    }
  }
  function getTotalSalary(department) {
    switch (department) {
      case 'Service Attendant':
        return '10000';
      case 'Technician':
        return '20000';
      case 'Manager':
        return '40000';
      case 'Supervisor':
        return '30000';
      case 'Engineer':
        return '50000';
      default:
        return '';
    }
  }
  


  function sendData(e){
    e.preventDefault();

    const newEmployee = {

      name,
      fullname,
      nic,
      address,
      gender,
      age,
      bdate,
      email,
      conactNum,
      department,
      basicSalary,
      totalSalary,
      qualification

    }

    axios.post("http://localhost:8070/employee/emadd",newEmployee).then(()=>{
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Add Successful',
        showConfirmButton: false,
        timer: 1500
      })
      navigate("/em");
    }).catch((err)=>{
      alert(err)
    })
   
  }

    return(

      <div style={{ 
        backgroundImage: `url(${process.env.PUBLIC_URL + '../background.gif'})`, 
        backgroundSize: 'cover',
        minHeight: '150vh',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        
        
    }}>
      <Header/>
      
                 <nav className="navbar navbar-expand-lg " style={{ backgroundColor: "#072b52" }}>
  <div className="container-fluid">
    
  
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
     
        <li className="nav-item">
        <Link to="/" className="nav-link active text-white" aria-current="page">Dashboard</Link>
        </li>  

        <li className="nav-item">
          <Link to="/emadd" className="nav-link active text-white" aria-current="page">Add New Employee</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>

<div className="col-lg-9-mt-2 mb-2 p-3 pt-4 text-white">
                <h1 style={{ textAlign: "left" ,paddingLeft:"90px" }}>Add New Employee</h1>
            </div>
            
        <div className="container shadow-lg p-3 mb-5  rounded" style={{background:"#04052e"}}>

<form onSubmit={sendData}>

 <div className="mb-3 text-white ">
    <label for="fullname" className="form-label">Full Name</label>
    <input type="text" className="form-control ml-2 mr-5" id="fullname"placeholder="Enter Full Name"
    required onChange={(e)=>{

        setFullname(e.target.value);
    }}/>

  </div>

  <div class="row g-3">
  <div className="col mb-3 text-white">
    <label for="name" className="form-label">Employee Name</label>
    <input type="text" className="form-control" id="name" placeholder="Enter Employee Name"
    required onChange={(e)=>{

      setName(e.target.value);

    }}/>
    
  </div>


  <div className="col mb-3 text-white">
    <label for="nic" className="form-label">NIC</label>
    <input type="text" className="form-control" id="nic"placeholder="Enter NIC"
     required onChange={(e)=>{

        setNic(e.target.value);
    }}/>
    
  </div>
  </div>

  <div className="mb-3 text-white">
    <label for="address" className="form-label">Address</label>
    <input type="text" className="form-control" id="address"placeholder="Enter Address"
     required onChange={(e)=>{

        setAddress(e.target.value);
    }}/>
    
  </div>



  <div class="row g-3">


<div class="col mb-3 text-white">
    <label for="gender" class="form-label">Gender</label>
    <select id="gender" class="form-select" required onChange={(e) => setGender(e.target.value)}>
      <option selected>Choose Gender</option>
      <option>Male</option>
      <option>Female</option>
    </select>
  </div>
    
  
  <div className="col mb-3 text-white">
  <label for="age" className="form-label">Age</label>
  <input
    type="text"
    className="form-control"
    id="age"
    placeholder="Enter Age"
    required
    onChange={(e) => {
      const inputAge = parseInt(e.target.value); // convert input value to integer
      if (inputAge <= 60) {
        setAge(inputAge); // set the age state if input is less than or equal to 60
      } else {
        Swal.fire({
          position: 'top-center',
          icon: 'error',
          title: 'Too Old',
          showConfirmButton: false,
          timer: 1500
        }) // set the age state to 60 if input is greater than 60
      }
    }}
  />
</div>

</div>

<div class="row g-3">

<div className="col mb-3 text-white">
  <label htmlFor="bday" className="form-label">Birth Day</label>
  <input type="date" className="form-control" id="bday" placeholder="Enter Birth Day"
    required onChange={(e)=>{
      setBday(e.target.value);
    }}
  />
</div>


  <div className="col mb-3 text-white">
    <label for="email" className="form-label">Email</label>
    <input type="text" className="form-control" id="email"placeholder="Enter Email"
     required onChange={(e)=>{

        setEmail(e.target.value);
    }}/>
    
  </div>
  </div>

  <div class="row g-3">

      <div className="col mb-3 text-white">
        <label htmlFor="contactNum" className="form-label">Contact Number</label>
        <input
          type="text"
          className="form-control"
          id="contactNum"
          placeholder="Enter Contact Number"
          maxLength="10"
          required
          value={conactNum}
          onChange={handleInputChange}
        />
        {invalidInput && <p className="text-danger">Please enter a valid 10-digit contact number.</p>}
      </div>




      <div class="col mb-3 text-white">
  <label for="department" class="form-label">Department</label>
  <select id="department" class="form-select" required onChange={(e) => {
    setDepartment(e.target.value);
    setBasicSalary(getBasicSalary(e.target.value));
    setTotalSalary(getTotalSalary(e.target.value));
    
  }}>
    <option selected>Choose Department</option>
    <option>Service Attendant</option>
    <option>Technician</option>
    <option>Manager</option>
    <option>Supervisor</option>
    <option>Engineer</option>
  </select>
</div>

</div>
<div className="mb-3 text-white">
  <label htmlFor="basicSalary" className="form-label">Basic Salary (LKR)</label>
  <div className="input-group">
    <span className="input-group-text">LKR</span>
    <input type="text" className="form-control" id="basicSalary" placeholder="Enter Basic Salary"
      value={basicSalary}
      required onChange={(e)=>{
        setBasicSalary(e.target.value);
        setTotalSalary(e.target.value);
      }}
    />
  </div>
</div>



  <div className="mb-3 text-white">
  <label htmlFor="qualification" className="form-label">Qualification</label>
  <textarea className="form-control" id="qualification" placeholder="Enter  qualification"
    required onChange={(e)=>{
      setQualification(e.target.value);
    }}
  />
</div>



  <button type="submit" className="btn btn-primary btn-lg">Submit</button>
  

</form>


        </div>
        </div>
    )
}
export default AddEmployee;