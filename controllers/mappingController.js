const { Mapping, Patient, Doctor } = require('../models');

// @desc    Assign a doctor to a patient
// @route   POST /api/mappings
// @access  Private
exports.createMapping = async (req, res) => {
    const { patientId, doctorId } = req.body;
    try {
        // Ensure the patient exists and belongs to the user
        const patient = await Patient.findOne({ where: { id: patientId, userId: req.user.id } });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found or you are not authorized' });
        }
        const doctor = await Doctor.findByPk(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        const mapping = await Mapping.create({ patientId, doctorId });
        res.status(201).json(mapping);
    } catch (error) {
        res.status(500).json({ message: `Server Error: ${error.message}` });
    }
};

// @desc    Get all patient-doctor mappings
// @route   GET /api/mappings
// @access  Private
exports.getMappings = async (req, res) => {
    try {
        const mappings = await Mapping.findAll({ include: [Patient, Doctor] });
        res.json(mappings);
    } catch (error) {
        res.status(500).json({ message: `Server Error: ${error.message}` });
    }
};

// @desc    Get all doctors for a specific patient
// @route   GET /api/mappings/:patient_id
// @access  Private
exports.getDoctorsForPatient = async (req, res) => {
    try {
        const patientId = req.params.patient_id;
        const patient = await Patient.findOne({
            where: { id: patientId, userId: req.user.id },
            include: Doctor
        });

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found or you are not authorized' });
        }
        res.json(patient.Doctors);
    } catch (error) {
        res.status(500).json({ message: `Server Error: ${error.message}` });
    }
};

// @desc    Remove a doctor from a patient
// @route   DELETE /api/mappings/:id
// @access  Private
exports.deleteMapping = async (req, res) => {
    try {
        // Here, req.params.id refers to the ID of the mapping record itself
        const mapping = await Mapping.findByPk(req.params.id);
        if (!mapping) {
            return res.status(404).json({ message: 'Mapping not found' });
        }

        // Optional: Check if the user owns the patient in this mapping
        const patient = await Patient.findOne({where: {id: mapping.patientId, userId: req.user.id}});
        if(!patient){
            return res.status(403).json({message: 'Not authorized to delete this mapping'});
        }

        await mapping.destroy();
        res.json({ message: 'Mapping removed successfully' });
    } catch (error) {
        res.status(500).json({ message: `Server Error: ${error.message}` });
    }
};