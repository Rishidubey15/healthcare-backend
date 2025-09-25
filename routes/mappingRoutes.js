const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    createMapping,
    getMappings,
    getDoctorsForPatient,
    deleteMapping
} = require('../controllers/mappingController');

router.route('/')
    .post(protect, createMapping)
    .get(protect, getMappings);

router.route('/:patient_id').get(protect, getDoctorsForPatient);
router.route('/:id').delete(protect, deleteMapping);

module.exports = router;