# fetchAdminPages

This folder contains a small service and a runnable script that fetches pages from the external `PAGES_SOURCE_URL` and upserts them into the `AdminPage` collection in MongoDB Atlas.

Usage

1. Create a `.env` in the `Backend` folder (or set env vars) with:

```
MONGO_URL=<your_mongodb_atlas_connection_string>
PAGES_SOURCE_URL=<url_returning_pages_array_or_{pages: [...] }>
```

2. From the `Backend` directory run:

```bash
npm run sync-admin-pages
```

This will connect to the DB, fetch pages, and upsert them.
