const AdminPage = require('../Modules/adminPageModel');

class AdminPageService {
    constructor() {
        this.syncInterval = null;
    }

    // Fetch admin pages from external source
    async fetchExternalPages() {
        try {
            // Placeholder for external API call
            console.log('Fetching admin pages from external source...');
            
            // This would typically make an API call to an external service
            const externalPages = [
                {
                    title: 'Welcome Message',
                    content: 'Welcome to the College Management System',
                    category: 'general',
                    isPublished: true
                }
            ];

            return externalPages;
        } catch (error) {
            console.error('Error fetching external pages:', error);
            throw error;
        }
    }

    // Sync external pages with database
    async syncPages() {
        try {
            const externalPages = await this.fetchExternalPages();
            
            for (const pageData of externalPages) {
                const existingPage = await AdminPage.findOne({ title: pageData.title });
                
                if (!existingPage) {
                    const newPage = new AdminPage({
                        ...pageData,
                        createdBy: '000000000000000000000000' // Default admin ID
                    });
                    await newPage.save();
                    console.log(`Created new page: ${pageData.title}`);
                }
            }
            
            console.log('Page synchronization completed');
        } catch (error) {
            console.error('Error syncing pages:', error);
            throw error;
        }
    }

    // Start automatic synchronization
    startAutoSync(intervalMinutes = 60) {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
        }

        this.syncInterval = setInterval(() => {
            this.syncPages();
        }, intervalMinutes * 60 * 1000);

        console.log(`Auto-sync started with ${intervalMinutes} minute interval`);
    }

    // Stop automatic synchronization
    stopAutoSync() {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
            this.syncInterval = null;
            console.log('Auto-sync stopped');
        }
    }
}

module.exports = new AdminPageService();