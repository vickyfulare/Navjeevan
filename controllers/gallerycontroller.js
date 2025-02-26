import Gallery from "../models/gallerymodel.js";

// Controller to create a new gallery entry
export const createGalleryController = async(req, res) => {
    const { gname, date } = req.body;

    // Ensure that required fields are present and the image is uploaded
    if (!gname || !date || !req.file) {
        return res.status(400).json({ message: 'All fields are required, including an image file' });
    }

    try {
        // Create a new gallery entry with the data received and the image file path
        const newGallery = new Gallery({
            gname,
            date,
            g_image: req.file.path, // Save the file path of the uploaded image
        });

        // Save the new gallery entry in the database
        const savedGallery = await newGallery.save();

        // Respond with the saved gallery entry
        res.status(201).json(savedGallery);
    } catch (error) {
        // Handle errors during the save process
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getAllGalleryController = async(req, res) => {
    try {
        // Fetch all gallery records from the database
        const galleries = await Gallery.find();

        // Respond with the fetched gallery records
        res.status(200).json(galleries);
    } catch (error) {
        // Handle any errors during the fetch process
        res.status(500).json({ message: 'Server error', error });
    }
};



// Controller to delete a gallery entry by ID
export const deleteGalleryController = async(req, res) => {
    const { id } = req.params;

    try {
        // Find the gallery entry by ID and delete it
        const deletedGallery = await Gallery.findByIdAndDelete(id);

        // If no gallery entry is found, return an error response
        if (!deletedGallery) {
            return res.status(404).json({ message: "Gallery entry not found" });
        }

        // Respond with success message
        res.status(200).json({ message: "Gallery entry deleted successfully" });
    } catch (error) {
        // Handle any errors during the delete process
        res.status(500).json({ message: "Server error", error });
    }
};