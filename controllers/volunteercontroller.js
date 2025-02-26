import Volunteer from "../models/volunteermodel.js";

// Controller to create a new volunteer entry
export const createVolunteer = async(req, res) => {
    const { name, email, phone, skills, message } = req.body;

    if (!name || !email || !phone || !skills) {
        return res.status(400).json({ message: "All fields except message are required" });
    }

    try {
        const newVolunteer = new Volunteer({ name, email, phone, skills, message });
        const savedVolunteer = await newVolunteer.save();
        res.status(201).json(savedVolunteer);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Controller to get all volunteers
export const getVolunteers = async(req, res) => {
    try {
        const volunteers = await Volunteer.find();
        res.status(200).json(volunteers);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Controller to delete a volunteer by ID
export const deleteVolunteer = async(req, res) => {
    const { id } = req.params;

    try {
        const deletedVolunteer = await Volunteer.findByIdAndDelete(id);
        if (!deletedVolunteer) {
            return res.status(404).json({ message: "Volunteer not found" });
        }
        res.status(200).json({ message: "Volunteer deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};



// Controller to update a volunteer by ID
export const updateVolunteer = async(req, res) => {
    const { id } = req.params;
    const { name, email, phone, skills, message } = req.body;

    try {
        const updatedVolunteer = await Volunteer.findByIdAndUpdate(
            id, { name, email, phone, skills, message }, { new: true, runValidators: true }
        );

        if (!updatedVolunteer) {
            return res.status(404).json({ message: "Volunteer not found" });
        }

        res.status(200).json(updatedVolunteer);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};