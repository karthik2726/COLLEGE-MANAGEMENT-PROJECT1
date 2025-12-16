const AdminPage = require('../Modules/adminPageModel');

// Get all admin pages
const getAdminPages = async (req, res) => {
    try {
        const pages = await AdminPage.find().sort({ createdAt: -1 });
        res.json(pages);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get admin page by ID
const getAdminPageById = async (req, res) => {
    try {
        const page = await AdminPage.findById(req.params.id);
        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }
        res.json(page);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Create admin page
const createAdminPage = async (req, res) => {
    try {
        const { title, content, category, isPublished } = req.body;

        const page = new AdminPage({
            title,
            content,
            category,
            isPublished: isPublished || false,
            createdBy: req.user.userId
        });

        await page.save();
        res.status(201).json({ message: 'Page created successfully', page });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update admin page
const updateAdminPage = async (req, res) => {
    try {
        const { title, content, category, isPublished } = req.body;

        const page = await AdminPage.findByIdAndUpdate(
            req.params.id,
            { title, content, category, isPublished, updatedAt: Date.now() },
            { new: true }
        );

        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }

        res.json({ message: 'Page updated successfully', page });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete admin page
const deleteAdminPage = async (req, res) => {
    try {
        const page = await AdminPage.findByIdAndDelete(req.params.id);
        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }
        res.json({ message: 'Page deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getAdminPages,
    getAdminPageById,
    createAdminPage,
    updateAdminPage,
    deleteAdminPage
};