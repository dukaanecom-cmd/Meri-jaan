import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser with 50mb limit for high-res photo uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

const dataDir = path.join(__dirname, 'data');
const uploadsDir = path.join(__dirname, 'public', 'uploads');
const savedDataFile = path.join(dataDir, 'savedBirthday.json');

// Ensure directories exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve public uploads statically
app.use('/uploads', express.static(uploadsDir));

// API: Get saved birthday data
app.get('/api/birthday-data', (_req, res) => {
  try {
    if (fs.existsSync(savedDataFile)) {
      const content = fs.readFileSync(savedDataFile, 'utf-8');
      return res.json({ success: true, data: JSON.parse(content) });
    }
    return res.json({ success: true, data: null });
  } catch (err) {
    console.error('Error reading saved birthday data:', err);
    return res.status(500).json({ success: false, error: 'Failed to read data' });
  }
});

// API: Save entire birthday data permanently
app.post('/api/birthday-data', (req, res) => {
  try {
    const payload = req.body;
    if (!payload) {
      return res.status(400).json({ success: false, error: 'Empty payload' });
    }
    fs.writeFileSync(savedDataFile, JSON.stringify(payload, null, 2), 'utf-8');
    return res.json({ success: true, message: 'Saved successfully to disk' });
  } catch (err) {
    console.error('Error writing saved birthday data:', err);
    return res.status(500).json({ success: false, error: 'Failed to save data' });
  }
});

// API: Upload individual photo and save as file
app.post('/api/upload-photo', (req, res) => {
  try {
    const { photoId, dataUrl } = req.body;
    if (!dataUrl) {
      return res.status(400).json({ success: false, error: 'Missing dataUrl' });
    }

    // Parse base64
    const matches = dataUrl.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
    let ext = 'jpg';
    let base64Data = dataUrl;

    if (matches && matches.length === 3) {
      ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
      base64Data = matches[2];
    } else {
      // Direct base64 string
      const commaIdx = dataUrl.indexOf(',');
      if (commaIdx !== -1) {
        base64Data = dataUrl.substring(commaIdx + 1);
      }
    }

    const filename = `photo_${photoId || 'custom'}_${Date.now()}.${ext}`;
    const filePath = path.join(uploadsDir, filename);

    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

    const publicUrl = `/uploads/${filename}`;
    return res.json({ success: true, url: publicUrl });
  } catch (err) {
    console.error('Error saving uploaded photo:', err);
    return res.status(500).json({ success: false, error: 'Failed to upload photo' });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    // Vite Dev Server Middleware
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production: serve built static assets from dist
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
