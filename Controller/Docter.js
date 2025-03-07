import DocterData from "../models/DocterModel.js";

export const postDocterform= async(req,res)=>{
    try {
        const body = req.body;
        if (!body) {
            return res.status(400).json({
                message: "Please fill out the form"
            });
        }
        const docter = new DocterData(body);
        await docter.save();
        return res.status(201).json({
            message: "Docter data saved successfully",
            data: docter
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

// get all docter data
export const getDocterData = async (req, res) => {
    try {
        const data = await DocterData.find();
        return res.status(200).json({
            message: "Docter data fetched successfully",
            data: data
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};


// get docter data by id
export const getDocterDataById = async (req, res) => {
    try {
        const { _id } = req.params;
        const data = await DocterData.findById(_id);
        if (!data) {
            return res.status(404).json({
                message: "Docter not found"
            });
        }
        return res.status(200).json({
            message: "Docter data fetched successfully",
            data: data
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};

// update docter data by id
export const updateDocterData = async (req, res) => {
    try {
        const { body } = req;
        const { _id } = req.params;
        if (!body) {
            return res.status(400).json({
                message: "Please provide data to update"
            });
        }
        const docter = await DocterData.findByIdAndUpdate(_id, body, { new: true });
        if (!docter) {
            return res.status(404).json({
                message: "Docter not found"
            });
        }
        return res.status(200).json({
            message: "Docter data updated successfully",
            data: docter
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};

// delete docter data by id
export const deleteDocterData = async (req, res) => {
    try {
        const { _id } = req.params;
        const docter = await DocterData.findByIdAndDelete(_id);
        if (!docter) {
            return res.status(404).json({
                message: "Docter not found"
            });
        }
        return res.status(200).json({
            message: "Docter data deleted successfully",
            data: docter
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};
