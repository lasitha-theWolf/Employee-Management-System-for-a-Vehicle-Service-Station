import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';

export default function UpdateEmployee(){
    const [employee, setEmployee] = useState({});
    const [loading, setLoading] = useState(true);

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
  const [qualification,setQualification] = useState("");

  const navigate = useNavigate();
    const params = useParams();
    const userId = params.id;

    useEffect(() => {
        async function Getid(){
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:8070/employee/emget/${userId}`)
                setEmployee(res.data.employee);
                console.log(res.data);

                setName(res.data.employee.name);
                setFullname(res.data.employee.fullname);
                setNic(res.data.employee.nic);
                setAddress(res.data.employee.address);
                setGender(res.data.employee.gender);
                setAge(res.data.employee.age);
                setBday(res.data.employee.bdate);
                setEmail(res.data.employee.email);
                setContactNum(res.data.employee.conactNum);
                setDepartment(res.data.employee.department);
                setBasicSalary(res.data.employee.basicSalary);
                setQualification(res.data.employee.qualification);
               
                setLoading(false);
            } catch (err) {
                setLoading(false);
                alert(err.message);
            }
        }
        Getid();
    }, [userId])

    function handleSubmit(e) {
        e.preventDefault();
        const updatedEmployee = {
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
          qualification
        }
        axios.put(`http://localhost:8070/employee/emupdate/${userId}`, updatedEmployee)
            .then(() => {
              Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Employee Updated',
                showConfirmButton: false,
                timer: 1500
              })
              navigate("/em");
            })
            .catch((err) => {
                alert(err);
            });
    }

    return (
      <div style={{ 
        backgroundImage: `url(${process.env.PUBLIC_URL + '../background.gif'})`, 
        backgroundSize: 'cover',
        minHeight: '160vh',
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
          <Link to="/scan" className="nav-link active text-white" aria-current="page">QR Scanner</Link>
        </li>
    <li className="nav-item">
    <Link to="/em" className="nav-link active text-white" aria-current="page">Dashboard</Link>
    </li>  

    <li className="nav-item">
      <Link to="/emadd" className="nav-link active text-white" aria-current="page">Add New Employee</Link>
    </li>
  </ul>
</div>
</div>
</nav>
<div className="col-lg-9-mt-2 mb-2 p-3 pt-4 text-white">
            <h1 style={{ textAlign: "left" ,paddingLeft:"90px" }}>Update Employee</h1>
        </div>
        
    <div className="container shadow-lg p-3 mb-5  rounded" style={{background:"#04052e"}}>

            {loading ? (
                <div>Loading...</div>
            ) : (
              <form onSubmit={handleSubmit}>
              <div className="mb-3 text-white ">
                <label htmlFor="fullname" className="form-label">Full Name</label>
                <input type="text" className="form-control ml-2 mr-5" id="fullname" placeholder="Enter Employee full Name"
                value={fullname} required onChange={(e)=>{
                    setFullname(e.target.value)
                }}/>
              </div>
            
              <div class="row g-3">
              <div className="col mb-3 text-white">
                <label for="name" className="form-label">Employee Name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter Employee Name"
                value={name} required onChange={(e)=>{
            
                  setName(e.target.value);
            
                }}/>
                
              </div>
            
            
              <div className="col mb-3 text-white">
                <label for="nic" className="form-label">NIC</label>
                <input type="text" className="form-control" id="nic"placeholder="Enter NIC"
                value={nic} required onChange={(e)=>{
            
                    setNic(e.target.value);
                }}/>
                
              </div>
              </div>
            
              <div className="mb-3 text-white">
                <label for="address" className="form-label">Address</label>
                <input type="text" className="form-control" id="address"placeholder="Enter Address"
                value={address} required onChange={(e)=>{
            
                    setAddress(e.target.value);
                }}/>
                
              </div>
            
            
            
              <div class="row g-3">
            
            
            <div class="col mb-3 text-white">
                <label for="gender" class="form-label">Gender</label>
                <select id="gender" class="form-select"value={gender} required onChange={(e) => setGender(e.target.value)}>
                  <option selected>Choose Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
                
              
              <div className="col mb-3 text-white">
                <label for="age" className="form-label">Age</label>
                <input type="text" className="form-control" id="age"placeholder="Enter Age"
                value={age} required  onChange={(e)=>{
            
                    setAge(e.target.value);
                }}/>
                
              </div>
            </div>
            
            <div class="row g-3">
            
            <div className="col mb-3 text-white">
              <label htmlFor="bday" className="form-label">Birth Day</label>
              <input type="date" className="form-control" id="bday" placeholder="Enter Birth Day"
               value={bdate} required onChange={(e)=>{
                  setBday(e.target.value);
                }}
              />
            </div>
            
            
              <div className="col mb-3 text-white">
                <label for="email" className="form-label">Email</label>
                <input type="text" className="form-control" id="email"placeholder="Enter Email"
                value={email} required onChange={(e)=>{
            
                    setEmail(e.target.value);
                }}/>
                
              </div>
              </div>
            
              <div class="row g-3">
              <div className="col mb-3 text-white">
                <label for="contactNum" className="form-label">Contact Number</label>
                <input type="text" className="form-control" id="contactNum"placeholder="Enter Contact Number"
                value={conactNum} required onChange={(e)=>{
            
                    setContactNum(e.target.value);
                }}/>
                
              </div>
            
            
            
            <div class="col mb-3 text-white">
                <label for="department" class="form-label">Department</label>
                <select id="department" class="form-select"value={department} required  onChange={(e) => setDepartment(e.target.value)}>
                  <option selected>Choose Department</option>
                  <option>Service Attendant</option>
                  <option>Techician</option>
                  <option>Manager</option>
                  <option>Supervisor</option>
                  <option>Enginner</option>
                </select>
              </div>
                
              
            </div>
            
            
            <div className="mb-3 text-white">
  <label htmlFor="basicSalary" className="form-label">Basic Salary (LKR)</label>
  <div className="input-group">
    <span className="input-group-text">LKR</span>
    <input type="text" className="form-control" id="basicSalary" placeholder="Enter Basic Salary"
      value={basicSalary} required onChange={(e)=>{
        setBasicSalary(e.target.value);
      }}
    />
  </div>
</div>
             
            
            
            
              <div className="mb-3 text-white">
              <label htmlFor="qualification" className="form-label">Qualification</label>
              <textarea className="form-control" id="qualification"
               value={qualification} required  onChange={(e)=>{
                  setQualification(e.target.value);
                }}
              />
            </div>
                            
                                            <button type="submit" className="btn btn-primary">Update</button>
                            
                                        </form>
            )}
        </div>
        </div>
    );
}
