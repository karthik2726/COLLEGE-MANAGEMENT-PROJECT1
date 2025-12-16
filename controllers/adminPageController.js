const axios = require('axios');
const AdminPage = require('../Modules/adminPageModel');

async function fetchAndSyncPages(req, res) {
  try {
    const sourceUrl = process.env.PAGES_SOURCE_URL;
    if (!sourceUrl) return res.status(500).json({ error: 'PAGES_SOURCE_URL not set in env' });

    const response = await axios.get(sourceUrl);
    const pages = Array.isArray(response.data) ? response.data : response.data.pages || [];

    const ops = pages.map(async (p) => {
      const externalId = p.id || p._id || p.slug || String(p.url || p.externalId || '');
      const filter = { externalId };
      const update = {
        title: p.title || p.name || '',
        slug: p.slug || (p.title && p.title.toLowerCase().replace(/\s+/g, '-')) || '',
        content: p.content || p.body || p.html || '',
        sourceUrl,
        externalId,
        lastSyncedAt: new Date()
      };

      return AdminPage.findOneAndUpdate(filter, update, { upsert: true, new: true, setDefaultsOnInsert: true });
    });

    const results = await Promise.all(ops);
    return res.json({ synced: results.length, results });
  } catch (err) {
    console.error('fetchAndSyncPages error:', err);
    return res.status(500).json({ error: err.message });
  }
}

async function getAllPages(req, res) {
  try {
    const pages = await AdminPage.find().sort({ lastSyncedAt: -1 });
    res.json({ count: pages.length, pages });
  } catch (err) {
    console.error('getAllPages error:', err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { fetchAndSyncPages, getAllPages };
