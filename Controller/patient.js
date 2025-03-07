import  DataModel  from '../models/models.js';
import mongoose from "mongoose";


export const postPatientForm = async (req, res) => {
  try {
    const body = req.body;

    // Check if request body is empty
    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ message: "Request body is required" });
    }

    // Create and save the document
    const patient = new DataModel(body);
    await patient.save();

    return res.status(201).json({ message: "Data saved successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getPatientData = async(req,res)=>{
    try {
        const data = await DataModel.find();
        return res.status(200).json({
            message: "Patient data fetched successfully",
            data:data
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

export const getPatientDataById = async(req,res)=>{
    try {
        const {_id} = req.params;
        const data = await DataModel.findById(_id);
        return res.status(200).json({
            message: "Patient data fetched successfully",
            data:data
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}



export const updatePatientData = async(req,res)=>{
    try {
        const {body} = req;
        const {_id} = req.params;
        
        const patient = await DataModel.findByIdAndUpdate(_id,body,{new:true});
        return res.status(200).json({
            message: "Patient data updated successfully",
            data:patient
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}

export const deletePatientData = async(req,res)=>{
    try {
        const {_id} = req.params;
        const patient = await DataModel.findByIdAndDelete(_id);
        return res.status(200).json({
            message: "Patient data deleted successfully",
            data:patient
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}