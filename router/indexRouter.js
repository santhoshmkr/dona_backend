import express from 'express';
import { deletePatientData, getPatientData, getPatientDataById, postPatientForm, updatePatientData } from '../Controller/patient.js';
import { login, register } from '../Controller/authondication.js';
import { authenCatedToken } from '../middleware/middleware.js';
import { postDocterform,deleteDocterData,getDocterData,getDocterDataById,updateDocterData } from '../Controller/Docter.js';

const router = express.Router();

// Router For Add Patient Details
router.post('/patient-detials',postPatientForm);

// Router For Get Patient Details
router.get('/get-patient-detials',getPatientData);

router.get('/get-patient-detials/:_id',getPatientDataById);

// Router For Update Patient Details 
router.put('/update-patient-detials/:_id',updatePatientData);

// Router For Delete Patient Details
router.delete('/delete-patient-detials/:_id',authenCatedToken,deletePatientData);


// Router For Add Docter Details
router.post('/docter-details', postDocterform);

// Router For Get Docter Details
router.get('/get-docter-details', getDocterData);

// Router For Get Docter Details By Id
router.get('/get-docter-details/:_id', getDocterDataById);

// Router For Update Docter Details
router.put('/update-docter-details/:_id', updateDocterData);

// Router For Delete Docter Details
router.delete('/delete-docter-details/:_id', deleteDocterData);

router.post('/register', register);

router.post('/login',login);
router.get('/login',login);

export default router;