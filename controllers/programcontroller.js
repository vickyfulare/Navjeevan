import fs from 'fs';
import Program from '../models/programmodel.js';

// @desc    Get all programs
// @route   GET /api/programs
// @access  Public
export const getAllPrograms = async(req, res) => {
    try {
        const programs = await Program.find(); // Fetch all programs from the database
        res.status(200).json(programs); // Send response with the list of programs
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch programs', error });
    }
};

// @desc    Get a single program by ID
// @route   GET /api/programs/:id
// @access  Public
export const getProgramById = async(req, res) => {
    const { id } = req.params;

    try {
        const program = await Program.findById(id);
        if (!program) {
            return res.status(404).json({ message: 'Program not found' });
        }
        res.status(200).json(program);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch program', error });
    }
};

// @desc    Add a new program with image upload
// @route   POST /api/programs
export const createProgramController = async(req, res) => {
    const { pname, date, pdescription } = req.body;

    if (!pname || !date || !pdescription || !req.file) {
        return res.status(400).json({ message: 'All fields are required, including an image file' });
    }

    try {
        const newProgram = new Program({
            pname,
            date,
            pdescription,
            p_image: req.file.path, // Save the file path
        });

        const savedProgram = await newProgram.save();
        res.status(201).json(savedProgram);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// @desc    Update an existing program
// @route   PUT /api/programs/:id
export const updateProgram = async(req, res) => {
    const { id } = req.params;
    const { pname, date, pdescription } = req.body;

    try {
        const program = await Program.findById(id);
        if (!program) {
            return res.status(404).json({ message: 'Program not found' });
        }

        // Update fields
        program.pname = pname || program.pname;
        program.date = date || program.date;
        program.pdescription = pdescription || program.pdescription;

        // If a new file is uploaded, delete the old one and update
        if (req.file) {
            if (program.p_image) {
                fs.unlinkSync(program.p_image); // Remove old image
            }
            program.p_image = req.file.path;
        }

        const updatedProgram = await program.save();
        res.status(200).json(updatedProgram);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update program', error });
    }
};

// @desc    Delete a program
// @route   DELETE /api/programs/:id
export const deleteProgram = async(req, res) => {
    const { id } = req.params;

    try {
        const program = await Program.findById(id);
        if (!program) {
            return res.status(404).json({ message: 'Program not found' });
        }

        // Delete the image file if it exists
        if (program.p_image) {
            fs.unlinkSync(program.p_image);
        }

        await Program.findByIdAndDelete(id);
        res.status(200).json({ message: 'Program deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete program', error });
    }
};