const router = require("express").Router();
let Attendent =require("../models/Scanner");

//create



router.route("/atadd").post((req,res)=>{

    const name =req.body.name;
    const id=req.body.id;
    const date=req.body.date;
  
    

    const newAttendent = new Attendent({

        name,
        id,
        date

    })

    newAttendent.save().then(()=>{
        res.json("Attendent Added")
    }).catch((err)=>{
        console.log(err);
    })
  

})   


//read

router.route("/at").get((req,res)=>{

    Employee.find().then((attendents)=>{
        res.json(attendents)
    }).catch((err)=>{
        console.log(err)
    })
})

//update
//put method use for get the data and update


router.route("/atupdate/:id").put(async(req,res)=>{
    let userId = req.params.id;

    const{
        name,
        id,
        date
      
      } =req.body;

 

    const updateAttendent ={
        name,
        id,
        date
   
    }

    const update = await Attendent.findByIdAndUpdate(userId,updateAttendent)
    .then(()=>{
        res.status(200).send({status: "Attendent update"})

    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});

    })



    
})

//delete
router.route("/atdelete/:id").delete(async(req,res) =>{
    let userId = req.params.id;

    await Attendent.findByIdAndDelete(userId)
    .then(() =>{
        res.status(200).send({status : "Attendent deleted"});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status : "Error with delete user", error : err.message});
    })
})

//fetch


router.route("/atget/:id").get(async (req,res) =>{
    let userId =req.params.id;

    const user = await Attendent.findById(userId)
    .then((attendent)=>{
        res.status(200).send({status : "Employee fetched", attendent})
        
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({statys :"Error with get user",error : err.message});
    })
})




module.exports =router;