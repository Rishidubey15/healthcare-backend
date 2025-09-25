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
    .post(protect, addDoctor) 
    .get(getDoctors); 

router.route('/:id')
    .get(getDoctorById)
    .put(protect, updateDoctor) 
    .delete(protect, deleteDoctor); 

module.exports = router;