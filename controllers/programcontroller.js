import Program from "../models/programmodel.js";
import fs from "fs";

// ✅ Create Program
export const createProgramController = async(req, res) => {
    try {
        const { pname, date, pdescription } = req.fields;
        const p_image = req.files.p_image;
        // ✅ Validation
        switch (true) {
            case !pname:
                return res.status(400).json({ error: "Program name is required" });
            case !date:
                return res.status(400).json({ error: "Date is required" });
            case !pdescription:
                return res.status(400).json({ error: "Description is required" });
            case p_image && p_image.size > 2 * 1024 * 1024:
                return res.status(400).json({ error: "Image should be less than 2MB" });
        }

        // ✅ Save Data to MongoDB
        const program = new Program({ pname, date, pdescription });

        if (p_image) {
            program.p_image.data = fs.readFileSync(p_image.path);
            program.p_image.contentType = p_image.type;
        }

        await program.save();

        res.status(201).json({
            success: true,
            message: "Program created successfully",
            program,
        });
    } catch (error) {
        console.error("Program creation error:", error);
        res.status(500).json({
            success: false,
            message: "Error in creating program",
            error: error.message,
        });
    }
};

// ✅ Get All Programs
export const getAllProgramsController = async(req, res) => {
    try {
        const programs = await Program.find().select("-p_image.data").sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "Programs fetched successfully",
            programs,
        });
    } catch (error) {
        console.error("Error fetching programs:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching programs",
            error: error.message,
        });
    }
};

// ✅ Get Particular Program by ID
export const getProgramByIdController = async(req, res) => {
    try {
        const { id } = req.params;
        const program = await Program.findById(id).select("-p_image.data");

        if (!program) {
            return res.status(404).json({ success: false, message: "Program not found" });
        }

        res.status(200).json({
            success: true,
            message: "Program fetched successfully",
            program,
        });
    } catch (error) {
        console.error("Error fetching program:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching program",
            error: error.message,
        });
    }
};

// ✅ Get Program Image
export const getProgramImageController = async(req, res) => {
    try {
        const program = await Program.findById(req.params.id);
        if (!program || !program.p_image || !program.p_image.data) {
            return res.status(404).json({ message: "Image not found" });
        }

        res.set("Content-Type", program.p_image.contentType);
        return res.send(program.p_image.data);
    } catch (error) {
        console.error("Error fetching program image:", error);
        res.status(500).json({ message: "Error fetching image", error });
    }
};

// ✅ Delete Program
export const deleteProgramController = async(req, res) => {
    try {
        const { id } = req.params;
        const deletedProgram = await Program.findByIdAndDelete(id);

        if (!deletedProgram) {
            return res.status(404).json({ success: false, message: "Program not found" });
        }

        res.status(200).json({
            success: true,
            message: "Program deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting program:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting program",
            error: error.message,
        });
    }
};