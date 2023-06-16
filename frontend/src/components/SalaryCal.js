import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';

export default function SalaryCal(){
    const [employee, setEmployee] = useState({});
    const [loading, setLoading] = useState(true);

  let [name, setName] = useState("");
  const [basicSalary,setBasicSalary] = useState("");
  const [totalSalary,setTotalSalary] = useState("");

  const navigate = useNavigate();
  
 

    const params = useParams();
    const userId = params.id;

    useEffect(() => {
        async function Getid(){
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:8070/employee/emget/${userId}`)
                setEmployee(res.data.employees);
                console.log(res.data);

                setName(res.data.employee.name);
                setBasicSalary(res.data.employee.basicSalary);
                setTotalSalary(res.data.employee.totalSalary);
               
               
                setLoading(false);
            }
             catch (err) {
                setLoading(false);
                alert(err.message);
            }
        }
        Getid();
    }, [userId])

    function handleSubmit(e, userId) {
        e.preventDefault();
        const updatedEmployee = {
          
          totalSalary
          
        }
        axios.put(`http://localhost:8070/employee/cal/${userId}`, updatedEmployee)
            .then(() => {
                console.log(totalSalary);
                console.log(basicSalary);
                console.log(name);
              Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Employee total salary has been calculated',
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
            <h1 style={{ textAlign: "left" ,paddingLeft:"90px" }}>Employee Salary Calculator</h1>
        </div>
        
    <div className="container shadow-lg p-3 mb-5  rounded" style={{background:"#04052e"}}>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <form onSubmit={(e) => handleSubmit(e, userId)}>

              
            
              <div class="row g-3">
              <div className="col mb-3 text-white">
  <label for="name" className="form-label">Employee Name</label>
  <input type="text" className="form-control" id="name" placeholder="Enter Employee Name"
    value={name} readOnly required onChange={(e) => {
      setName(e.target.value);
    }}
  />
</div>

  
             
              </div>
            
            
              <div className="mb-3 text-white">
    <label htmlFor="basicSalary" className="form-label">Basic Salary (LKR)</label>
    <div className="input-group">
        <span className="input-group-text">LKR</span>
        <input type="text" className="form-control" id="basicSalary" placeholder="Enter Basic Salary"
        value={basicSalary} readOnly onChange={(e)=>{
            setBasicSalary(e.target.value);
        }}
        />
    </div>
</div>

<div className="col mb-3 text-white">
  <label htmlFor="days" className="form-label">Worked Days</label>
  <input type="number" className="form-control" id="days" placeholder="Enter Worked Days"
     required onChange={(e) => {
        const workedDays = parseInt(e.target.value);
        if (workedDays > 31) {
            Swal.fire({
                position: 'top-center',
                icon: 'error',
                title: 'Incorrect input',
                showConfirmButton: false,
                timer: 1500})
        }
        const totalSalary = parseInt(basicSalary) + (1800 * workedDays);
        setTotalSalary(totalSalary);
    }}
    max={31}
  />
</div>
                         
        <button type="submit" className="btn btn-primary">Calculate</button>
        
                            
                                        </form>
            )}
        </div>
        </div>
    );
}
