import React, {useState, useEffect} from "react";
import axios from "axios"; 
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import Header from '../components/Header';

//report
import jsPDF from "jspdf";
import "jspdf-autotable";


export default function AllEmployees(){

    const [employees, setEmployees] = useState([]);
    
    const updateTotalSalary = async (employeeId, newTotalSalary) => {
      try {
        await axios.put(`http://localhost:8070/employee/emupdate/${employeeId}`, {
          totalSalary: newTotalSalary
        });
        console.log(`Total salary updated for employee with id ${employeeId}`);
      } catch (err) {
        console.error(err.message);
      }
    }
    


      //reset totalSalary to basicSalary
      const resetSalary = () => {
        const updatedEmployees = employees.map((employee) => ({
          ...employee,
          totalSalary: employee.basicSalary
        }));
        setEmployees(updatedEmployees);
        updatedEmployees.forEach((employee) => {
          updateTotalSalary(employee._id, employee.totalSalary);
        });
      }
      
      
    
 
    useEffect(()=>{

        function getEmployees(){
            axios.get("http://localhost:8070/employee/em").then((res)=>{
               // console.log(res.data);  
               setEmployees(res.data);
            }).catch((err)=>{
                alert("err.message");
            })
        }
        getEmployees();
        

    },[])

    //search

    function filterData(employees, searchKey) {
      const result = employees.filter((employee) => {
        return (
          employee.name.includes(searchKey)||
          employee.department.includes(searchKey)||
          employee.conactNum.includes(searchKey)
        );
      });
    
      setEmployees(result);
    }
    
   function handleSearchArea  (e){
        const searchKey= e.currentTarget.value;

        axios.get("http://localhost:8070/employee/em").then((res)=>{
            // console.log(res.data);  
          filterData(res.data,searchKey);
         })
    }

    //report 
    function generatePDF(employees) {
      const doc = new jsPDF();
    
      // Set background color
      doc.setFillColor("#072b52");
      doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, "F");
    
      const tableColumn = ["ID", "Name", "Department", "Email", "Contact Number", "Total Salary"];
      const tableRows = [];
    
      employees.forEach((employee, index) => {
        const employeeData = [
          index + 1,
          employee.name,
          employee.department,
          employee.email,
          employee.conactNum,
          employee.totalSalary

        ];
        tableRows.push(employeeData);
      });
    
      // Add image at the top
      doc.addImage(process.env.PUBLIC_URL + '../slogo.png', "PNG", 70, 20, 70, 20);
    
      // Set table color to match background color
      doc.setTextColor("#fff");
      doc.setFillColor("#072b52");
    
      // Add table with data
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 50,
        theme: "grid",
        styles: {
          cellPadding: 0.5,
          fontSize: 10
        }
      });
    
      doc.text("All Employees Salary Details", 14, 45);
    
      doc.save("all-employee Salary Details.pdf");
    }
    
    


 return(

<div style={{ 
        backgroundImage: `url(${process.env.PUBLIC_URL + '../background.gif'})`, 
        backgroundSize: 'cover',
        minHeight: '100vh',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        
    }}>
      <Header/>

   
<div>
        <nav className="navbar navbar-expand-lg " style={{ backgroundColor: "#072b52" }}>
  <div className="container-fluid">
    
  
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
     
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
                <h1 style={{ textAlign: "left" ,paddingLeft:"90px" }}>Employees Dashboard</h1>
            </div>
            <div style={{textAlign:"right",paddingRight:"100px",paddingBottom:"20px" }}>
  <button className="btn btn-success btn-lg float-right"><a href="/emadd" style={{textDecoration:'none',color:"white"}}>+ Add New Employee</a></button>
</div>

 
<div className="container shadow-lg p-3 mb-5  rounded" style={{background:"#04052e"}}>
        <div className="row pb-3 pt-2">
          
            <div className="col-lg-9-mt-2 mb-2">
                <input className="form-control"
                 type="search"
                 placeholder="Search"
                 name="searchQuery"
                 onChange={handleSearchArea}
                 style={{ width: "200px",height:"25px" 
                 }}>

                 </input>
            </div>
        </div>
        
        
            
                
        <div className="table-responsive">
  <table className="table text-white">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Department</th>
        <th scope="col">Email</th>
        <th scope="col">Contact Num</th>
        <th scope="col">Total Salary</th>

        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      {employees.map((employee, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>
            <a href={`/emget/${employee._id}`} style={{ textDecoration: 'none' }}>
              {employee.name}
            </a>
          </td>
          <td>{employee.department}</td>
          <td>{employee.email}</td>
          <td>{employee.conactNum}</td>
          <td>{employee.totalSalary}</td>
          <td>
            <div className="btn-group" role="group">
              <a className="btn btn-success" href={`/cal/${employee._id}`}>
                <i className="fas fa-edit"></i>&nbsp; Calculate Salary
              </a>
              &nbsp;
              &nbsp;
              <a className="btn btn-warning" href={`/emupdate/${employee._id}`}>
                <i className="fas fa-edit"></i>&nbsp; Update Details
              </a>
              &nbsp;
              &nbsp;
              <a className="btn btn-danger" href={`/emdelete/${employee._id}`}>
                <i className="fas fa-trash-alt"></i>&nbsp; Delete
              </a> &nbsp; &nbsp;

            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

            
                
    </div>
    <div style={{ textAlign: "center", padding: "10px" }}>

  <button
    className="btn btn-success btn-lg"
    style={{ marginBottom: "10px" }}
    onClick={() => generatePDF(employees)}
  >
    <a style={{ textDecoration: "none", color: "white" }}>Monthly Salary Report</a>
  </button>
  
  <br />
  <button 
  className="btn btn-danger btn-lg" 
  onClick={() => {
    resetSalary();
    setEmployees(prevEmployees => prevEmployees.map(emp => ({
      ...emp,
      totalSalary: emp.basicSalary
    })));
  }}
>
  Monthly End Reset
</button>


</div>

    </div>
    </div>
)
 }

