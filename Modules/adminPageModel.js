const mongoose = require('mongoose');

const adminPageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, index: true },
  content: { type: String },
  sourceUrl: { type: String },
  externalId: { type: String, index: true },
  lastSyncedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.models.AdminPage || mongoose.model('AdminPage', adminPageSchema);
