const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({

    name : {
        type : String,
        required : true
     
    },
    fullname:{
        type :String,
        required :true
    },
    nic:{
        type :String,
        required :true
    },
    address:{
        type :String,
        required :true
    },
    gender:{
        type :String,
        required :true
    },
    age :{
        type : Number,
        required :true
    },
    bdate:{
        type :String,
        required :true
    },
    email:{
        type :String,
        required :true
    },
    conactNum:{
        type :String,
        required :true
    },
    department:{
        type :String,
        required :true
    },
    basicSalary:{
        type :String,
        required :true
    },
    totalSalary:{
        type :String,
        required :true
    },
    qualification:{
        type :String,
        required :true
    }
 
})


const Employee = mongoose.model("Employees",employeeSchema);
module.exports =Employee;  

