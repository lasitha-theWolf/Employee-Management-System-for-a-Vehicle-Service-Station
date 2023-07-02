const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attendentSchema = new Schema({

    name : {
        type : String,
        required : true
     
    },
    id:{
        type :String,
        required :true
    },
    date:{
      type :String,
      required :true
  },

})


const Attendent = mongoose.model("attendents",attendentSchema);
module.exports =Attendent;  

