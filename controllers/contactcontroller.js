import Contact from "../models/contactmodel.js";

export const createContact = async(req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        const newContact = new Contact({ name, email, subject, message });
        await newContact.save();

        // Send a single response after saving the contact
        res.status(201).json({ success: true, message: "Message sent!", contact: newContact });

    } catch (error) {
        res.status(500).json({ success: false, error: "Server Error!" });
    }
};


// controllers/contactController.js

// get contacts

export const getContacts = async(req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ success: false, error: "Server Error!" });
    }
};

// controllers/contactController.js

export const deleteContact = async(req, res) => {
    const { id } = req.params;
    try {
        const contact = await Contact.findByIdAndDelete(id);
        if (!contact) {
            return res.status(404).json({ success: false, message: "Contact not found" });
        }
        res.status(200).json({ success: true, message: "Contact deleted" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server Error!" });
    }
};


// controllers/contactController.js

export const updateContact = async(req, res) => {
    const { id } = req.params;
    const { name, email, subject, message } = req.body;
    try {
        const contact = await Contact.findByIdAndUpdate(id, { name, email, subject, message }, { new: true });
        if (!contact) {
            return res.status(404).json({ success: false, message: "Contact not found" });
        }
        res.status(200).json({ success: true, message: "Contact updated", contact });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server Error!" });
    }
};