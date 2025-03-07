import mongoose from "mongoose";


const DocterSchema = new mongoose.Schema({
    doctorNameMD: String,
    doctorNameNephrology: String,
    doctorNameUrology: String,
    hospitalName: String
})

export default mongoose.model("Docter", DocterSchema);