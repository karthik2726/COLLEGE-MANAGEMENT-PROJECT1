const axios = require('axios');
const AdminPage = require('../Modules/adminPageModel');

async function syncPagesFromSource() {
  const sourceUrl = process.env.PAGES_SOURCE_URL;
  if (!sourceUrl) throw new Error('PAGES_SOURCE_URL not set in environment');

  const response = await axios.get(sourceUrl, { timeout: 15000 });
  const pages = Array.isArray(response.data) ? response.data : (response.data.pages || []);

  const ops = pages.map((p) => {
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
  return { synced: results.length, results };
}

module.exports = { syncPagesFromSource };
