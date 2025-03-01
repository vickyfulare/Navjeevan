import Gallery from "../models/gallerymodel.js";
import fs from "fs";

// ✅ Create Gallery Item
export const createGalleryController = async(req, res) => {
    try {
        const { gname, date } = req.fields;
        const g_image = req.files.g_image;

        // ✅ Validation
        switch (true) {
            case !gname:
                return res.status(400).json({ error: "Gallery name is required" });
            case !date:
                return res.status(400).json({ error: "Date is required" });
            case !g_image:
                return res.status(400).json({ error: "Image is required" });
            case g_image.size > 2 * 1024 * 1024:
                return res.status(400).json({ error: "Image should be less than 2MB" });
        }

        // ✅ Save Image to MongoDB
        const gallery = new Gallery({ gname, date });

        if (g_image) {
            gallery.g_image.data = fs.readFileSync(g_image.path);
            gallery.g_image.contentType = g_image.type;
        }

        await gallery.save();

        res.status(201).json({
            success: true,
            message: "Gallery item created successfully",
            gallery,
        });
    } catch (error) {
        console.error("Gallery creation error:", error);
        res.status(500).json({
            success: false,
            message: "Error in creating gallery item",
            error: error.message,
        });
    }
};

// ✅ Get All Gallery Items
export const getAllGalleryController = async(req, res) => {
    try {
        const galleryItems = await Gallery.find().select("-g_image.data").sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "Gallery items fetched successfully",
            gallery: galleryItems,
        });
    } catch (error) {
        console.error("Error fetching gallery items:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching gallery items",
            error: error.message,
        });
    }
};

export const getGalleryImageController = async(req, res) => {
    try {
        const galleryItem = await Gallery.findById(req.params.id);
        if (!galleryItem || !galleryItem.g_image || !galleryItem.g_image.data) {
            return res.status(404).json({ message: "Image not found" });
        }

        res.set("Content-Type", galleryItem.g_image.contentType);
        return res.send(galleryItem.g_image.data);
    } catch (error) {
        console.error("Error fetching image:", error);
        res.status(500).json({ message: "Error fetching image", error });
    }
};
// ✅ Delete Gallery Item
export const deleteGalleryController = async(req, res) => {
    try {
        const { id } = req.params;
        const deletedGallery = await Gallery.findByIdAndDelete(id);

        if (!deletedGallery) {
            return res.status(404).json({ success: false, message: "Gallery item not found" });
        }

        res.status(200).json({
            success: true,
            message: "Gallery item deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting gallery item:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting gallery item",
            error: error.message,
        });
    }
};