const express = require('express');
const {
    getAdminPages,
    getAdminPageById,
    createAdminPage,
    updateAdminPage,
    deleteAdminPage
} = require('../controllers/adminPageController');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/admin/pages
// @desc    Get all admin pages
// @access  Public
router.get('/pages', getAdminPages);

// @route   GET /api/admin/pages/:id
// @desc    Get admin page by ID
// @access  Public
router.get('/pages/:id', getAdminPageById);

// @route   POST /api/admin/pages
// @desc    Create admin page
// @access  Private (Admin only)
router.post('/pages', auth, adminAuth, createAdminPage);

// @route   PUT /api/admin/pages/:id
// @desc    Update admin page
// @access  Private (Admin only)
router.put('/pages/:id', auth, adminAuth, updateAdminPage);

// @route   DELETE /api/admin/pages/:id
// @desc    Delete admin page
// @access  Private (Admin only)
router.delete('/pages/:id', auth, adminAuth, deleteAdminPage);

module.exports = router;