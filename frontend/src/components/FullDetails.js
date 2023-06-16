import React, { useState,useEffect} from "react";
import { Card } from 'react-bootstrap';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import './FullDetails.css';
import Header from '../components/Header';

//qr
import QRCode from 'qrcode.react';

//report
import jsPDF from "jspdf";


export default function FullDetails(){
    const [employee, setEmployee] = useState({});
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const userId = params.id;

    useEffect(() => {

        async function Getid(){
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:8070/employee/emget/${userId}`)

                setEmployee(res.data);
                setLoading(false);
                console.log(res.data);
            } catch (err) {
                setLoading(false);
                alert(err.message);
            }
        }
        Getid();
    }, [userId])



    const employeeData = employee.employee || {};
const {name, fullname, nic, address, gender,age,bdate,email,conactNum,department,basicSalary,totalSalary,qualification} = employeeData;


const generatePDF = () => {
  const doc = new jsPDF();

  doc.setFillColor("#072b52");
  doc.rect(0, 0, 210, 297, "F");

  doc.addImage(process.env.PUBLIC_URL + '../slogo.png', "PNG", 70, 20, 70, 20);

  const name = employeeData.name;
  const bdate = employeeData.bdate;
  const department = employeeData.department;
  const nic = employeeData.nic;

  // Add employee details
  doc.setFontSize(22);
  doc.setTextColor("#ffffff");
  doc.text("Employee ID", 85, 60);
  doc.setLineWidth(0.5);
  doc.setDrawColor('#ffffff');
  doc.line(85, 63, 125, 63);
  
  doc.setFontSize(16);
  const pageWidth = doc.internal.pageSize.getWidth();
  const nameTextWidth = doc.getStringUnitWidth(`Name: ${name}`) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const nicTextWidth = doc.getStringUnitWidth(`NIC: ${nic}`) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const bdateTextWidth = doc.getStringUnitWidth(`Date of Birth: ${bdate}`) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const departmentTextWidth = doc.getStringUnitWidth(`Department: ${department}`) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const center = pageWidth / 2;
  doc.text(`Name: ${name}`, center - (nameTextWidth / 2), 80);
  doc.text(`NIC: ${nic}`, center - (nicTextWidth / 2), 95);
  doc.text(`Date of Birth: ${bdate}`, center - (bdateTextWidth / 2), 110);
  doc.text(`Department: ${department}`, center - (departmentTextWidth / 2), 125);

  // Generate QR code as data URL
  const qrCodeDataURL = document.querySelector("canvas").toDataURL("image/png");

  // Add QR code as image
  doc.addImage(qrCodeDataURL, "PNG", 70, 150, 70, 70);

  doc.setLineWidth(1.5);
  doc.setDrawColor("#ffffff");
  doc.line(10, 10, 10, 287); // left vertical line
  doc.line(10, 10, 200, 10); // top horizontal line
  doc.line(200, 10, 200, 287); // right vertical line
  doc.line(10, 287, 200, 287); // bottom horizontal line

  doc.save(`${name}.pdf`);
};

   
    
return (
<div style={{ 
        backgroundImage: `url(${process.env.PUBLIC_URL + '../background.gif'})`, 
        backgroundSize: 'cover',
        minHeight: '170vh',
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
    <div style={{marginTop :'20px'}}>
     
        {loading ? (
            <div>Loading...</div>
        ) : (employee && employeeData && Object.keys(employeeData).length !== 0 ? (
            <div>
                <div className="col-lg-9-mt-2 mb-2 p-3 pt-4 text-white">
                <h1 style={{ textAlign: "left" ,paddingLeft:"90px" }}>{name}</h1>
            </div>
                
                <div className="container shadow-lg p-3 mb-5  rounded  " style={{background:"#04052e"}}>
                <div className="profile">
  <h1 className="profile__title">Profile</h1>
  <dl className="profile__details">
    <div className="profile__section">
      <dt className="profile__heading">Full Name</dt>
      <dd className="profile__content">{fullname}</dd>
    </div>
    <div className="profile__section">
      <dt className="profile__heading">NIC</dt>
      <dd className="profile__content">{nic}</dd>
    </div>
    <div className="profile__section">
      <dt className="profile__heading">Address</dt>
      <dd className="profile__content">{address}</dd>
    </div>
    <div className="profile__section">
      <dt className="profile__heading">Gender</dt>
      <dd className="profile__content">{gender}</dd>
    </div>
    <div className="profile__section">
      <dt className="profile__heading">Age</dt>
      <dd className="profile__content">{age}</dd>
    </div>
    <div className="profile__section">
      <dt className="profile__heading">Birth Day</dt>
      <dd className="profile__content">{bdate}</dd>
    </div>
    <div className="profile__section">
      <dt className="profile__heading">Email</dt>
      <dd className="profile__content">{email}</dd>
    </div>
    <div className="profile__section">
      <dt className="profile__heading">Contact Number</dt>
      <dd className="profile__content">{conactNum}</dd>
    </div>
    <div className="profile__section">
      <dt className="profile__heading">Department</dt>
      <dd className="profile__content">{department}</dd>
    </div>
    <div className="profile__section">
      <dt className="profile__heading">Basic Salary</dt>
      <dd className="profile__content">{basicSalary}</dd>
    </div>
    <div className="profile__section">
      <dt className="profile__heading">Total Salary</dt>
      <dd className="profile__content">{totalSalary}</dd>
    </div>
    <div className="profile__section">
      <dt className="profile__heading">Qualification</dt>
      <dd className="profile__content">{qualification}</dd>
    </div>
  </dl>
</div>


                <div className="d-flex justify-content-center m-4">
                <Card style={{ width: '18rem' }} className="mx-auto">
  <Card.Body className="text-center">
    <QRCode value={`${userId}-${fullname}`} size={200} />
  </Card.Body>
</Card>

    </div>

<div>
  <button
    className="btn btn-success btn-lg mb-3"
    style={{ marginBottom: "10px" }}
    onClick={generatePDF}
  >
    <a style={{ textDecoration: "none", color: "white" }}>Download Employee ID</a>
  </button>
</div>


            </div>
            </div>
        ) : (
            <div>Loading...</div>
        ))}
    </div>
    </div>
    </div>
)

            }