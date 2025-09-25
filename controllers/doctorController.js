const { Doctor } = require('../models');
const { body, validationResult } = require('express-validator');

// @desc    Add a new doctor
// @route   POST /api/doctors
// @access  Private
exports.addDoctor = [
    body('name').notEmpty().withMessage('Name is required'),
    body('specialization').notEmpty().withMessage('Specialization is required'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { name, specialization, contact } = req.body;
            const doctor = await Doctor.create({ name, specialization, contact });
            res.status(201).json(doctor);
        } catch (error) {
            res.status(500).json({ message: `Server Error: ${error.message}` });
        }
    }
];

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public (or Private, your choice)
exports.getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.findAll();
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: `Server Error: ${error.message}` });
    }
};

// @desc    Get a specific doctor by ID
// @route   GET /api/doctors/:id
// @access  Public
exports.getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findByPk(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ message: `Server Error: ${error.message}` });
    }
};

// @desc    Update doctor details
// @route   PUT /api/doctors/:id
// @access  Private (assuming only authenticated users can manage doctors)
exports.updateDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByPk(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        const updatedDoctor = await doctor.update(req.body);
        res.json(updatedDoctor);
    } catch (error) {
        res.status(500).json({ message: `Server Error: ${error.message}` });
    }
};

// @desc    Delete a doctor
// @route   DELETE /api/doctors/:id
// @access  Private
exports.deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByPk(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        await doctor.destroy();
        res.json({ message: 'Doctor removed successfully' });
    } catch (error) {
        res.status(500).json({ message: `Server Error: ${error.message}` });
    }
};