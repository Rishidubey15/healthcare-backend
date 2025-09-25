const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    addDoctor,
    getDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor
} = require('../controllers/doctorController');

router.route('/')
    .post(protect, addDoctor) // Private
    .get(getDoctors); // Public

router.route('/:id')
    .get(getDoctorById) // Public
    .put(protect, updateDoctor) // Private
    .delete(protect, deleteDoctor); // Private

module.exports = router;