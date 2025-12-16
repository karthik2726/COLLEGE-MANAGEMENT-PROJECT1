const express = require('express');
const router = express.Router();
const { fetchAndSyncPages, getAllPages } = require('../controllers/adminPageController');
const { adminAuth } = require('../middleware/auth');

// Trigger a sync from the external pages source into MongoDB Atlas
router.post('/sync', adminAuth, fetchAndSyncPages);

// Get all stored pages
router.get('/', adminAuth, getAllPages);

module.exports = router;
