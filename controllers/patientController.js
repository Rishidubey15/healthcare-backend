const { Patient } = require('../models');
const { body, validationResult } = require('express-validator');

// @desc    Add a new patient
// @route   POST /api/patients
// @access  Private
exports.addPatient = [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('age').isInt({ gt: 0 }).withMessage('Age must be a positive integer'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { name, age, gender, address, phone } = req.body;
            const patient = await Patient.create({
                name,
                age,
                gender,
                address,
                phone,
                userId: req.user.id,
            });
            res.status(201).json(patient);
        } catch (error) {
            res.status(500).json({ message: `Server Error: ${error.message}` });
        }
    }
];

// @desc    Get all patients for the logged-in user
// @route   GET /api/patients
// @access  Private
exports.getPatients = async (req, res) => {
    try {
        const patients = await Patient.findAll({ where: { userId: req.user.id } });
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: `Server Error: ${error.message}` });
    }
};

// @desc    Get a specific patient by ID
// @route   GET /api/patients/:id
// @access  Private
exports.getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found or you do not have permission' });
        }
        res.json(patient);
    } catch (error) {
        res.status(500).json({ message: `Server Error: ${error.message}` });
    }
};

// @desc    Update a patient's details
// @route   PUT /api/patients/:id
// @access  Private
exports.updatePatient = async (req, res) => {
    try {
        const patient = await Patient.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found or you do not have permission' });
        }
        const updatedPatient = await patient.update(req.body);
        res.json(updatedPatient);
    } catch (error) {
        res.status(500).json({ message: `Server Error: ${error.message}` });
    }
};

// @desc    Delete a patient
// @route   DELETE /api/patients/:id
// @access  Private
exports.deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found or you do not have permission' });
        }
        await patient.destroy();
        res.json({ message: 'Patient removed successfully' });
    } catch (error) {
        res.status(500).json({ message: `Server Error: ${error.message}` });
    }
};