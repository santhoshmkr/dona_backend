import mongoose from 'mongoose';

const patientDetails = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
});

const Patient = mongoose.model("Padient",patientDetails);

export default Patient;
