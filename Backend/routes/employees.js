const router = require("express").Router();
let Employee =require("../models/Employee");

//create



router.route("/emadd").post((req,res)=>{

    const name =req.body.name;
    const fullname=req.body.fullname;
    const nic=req.body.nic;
    const address=req.body.address;
    const gender =req.body.gender;
    const age=Number(req.body.age);
    const bdate=req.body.bdate;
    const email=req.body.email;
    const conactNum= req.body.conactNum;
    const department=req.body.department;
    const basicSalary=req.body.basicSalary;
    const totalSalary=req.body.totalSalary;
    const qualification=req.body.qualification;
    

    const newEmployee = new Employee({

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

    })

    newEmployee.save().then(()=>{
        res.json("Employee Added")
    }).catch((err)=>{
        console.log(err);
    })
  

})   


//read

router.route("/em").get((req,res)=>{

    Employee.find().then((employees)=>{
        res.json(employees)
    }).catch((err)=>{
        console.log(err)
    })
})

//update
//put method use for get the data and update


router.route("/emupdate/:id").put(async(req,res)=>{
    let userId = req.params.id;

    const{
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
        qualification} =req.body;

    /* const name =req.body.name;
    const age =Number(req.body.age); 
    const gender =req.body.gender;
    kiyna ekamai uda tiyenne
    */

    const updateEmployee ={
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

    const update = await Employee.findByIdAndUpdate(userId,updateEmployee)
    .then(()=>{
        res.status(200).send({status: "Employee update"})

    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});

    })



    
})

//delete
router.route("/emdelete/:id").delete(async(req,res) =>{
    let userId = req.params.id;

    await Employee.findByIdAndDelete(userId)
    .then(() =>{
        res.status(200).send({status : "Employee deleted"});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status : "Error with delete user", error : err.message});
    })
})

//fetch


router.route("/emget/:id").get(async (req,res) =>{
    let userId =req.params.id;

    const user = await Employee.findById(userId)
    .then((employee)=>{
        res.status(200).send({status : "Employee fetched", employee})
        
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({statys :"Error with get user",error : err.message});
    })
})


//employee total salary
router.route("/cal/:id").put(async(req,res)=>{
    let userId = req.params.id;

    const{
     
        basicSalary,
        totalSalary,
        } =req.body;

 

    const updateSalary ={
       
        basicSalary,
        totalSalary,
        
    }

    const update = await Employee.findByIdAndUpdate(userId,updateSalary)
    .then(()=>{
        res.status(200).send({status: "Employee salary update"})

    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});

    })



    
})


module.exports =router;