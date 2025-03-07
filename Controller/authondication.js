import Patient from "../models/authondication.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

// API For Registering User
export const register = async (req,res)=>{
    const {email , name, password} = req.body;

    if(!email || !name || !password){
        return res.status(404).json({
            message:"Please fill out the form"
        });
    }
try {
    const existingPatient = await Patient.findOne({email});
    if(existingPatient){
        return res.status(401).json({
            message:"User Is Already Existing"
        });
    }

    const hashPassword = await bcrypt.hash(password,10);

    const newPatient = Patient({email,name,password:hashPassword});
    await newPatient.save();
    return res.status(201).json({
        message:"User Created"
    })
} catch (error) {
    console.log(error);
    
    return res.status(505).json({
        message:'SomeThing Worng'
    })
}
}

export const login = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const chechPatient = await Patient.findOne({email});
        if(!chechPatient){
            return res.status(404).json({
                message:"User Not Have Account"
            });
        }

        const comparPassword = await bcrypt.compare(password,chechPatient.password);
        if(!comparPassword){
            return res.status(404).json({
                message:"Worng Passoword"
            });
        }
        const token = jwt.sign({
            id: chechPatient._id,phone_number:chechPatient.email
        },process.env.JWT_SECRET,{
            expiresIn:"24h"
        }
    );

    return res.status(201).json({
        message:"Login Successfully",
        token:token
    })
        
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            message:"SomeThing Went Worng"
        })
    }
}