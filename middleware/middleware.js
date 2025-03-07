import jwt from 'jsonwebtoken';
import PatientDetails from '../models/authondication.js';
 
export const authenCatedToken = async(req,res,next)=>{
            const autherHeader = req.headers['authorization']
            
            if(!autherHeader || !autherHeader.startsWith('Bearer ')){
                return res.status(401).json({
                    message:"Authorization token is Missed or Token incavailte"
                });
            }
            const token = autherHeader.split(' ')[1];
            if(!token){
                return res.status(401).json({
                    message:"Token Not Provider"
                });
            }
            try{
                const decoded = jwt.verify(token,process.env.JWT_SECRET);
                req.user = await PatientDetails.findById(decoded.id);
                if(!req.user){
                    return res.status(404).json({
                        message:"Padient Not Found"
                    });
                }
                next()
        } catch (error) {
            console.log(error);
            
         res.status(500).json({
            message:"SomeThing Went Worng "
         })   
        }
}