import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import axios from 'axios';
import dotenv from 'dotenv';
import { google } from 'googleapis';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Google Sheets Contact Proxy (using Apps Script Web App)
  app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxDso7MbTAnYTnkjUwFHKO32yuIReSO4ZDmtPmNOLSk82F2RtK_p30wMOf_4P2z4hr4jw/exec';

    try {
      // Forward request to Google Apps Script
      // Note: Apps Script might require form-urlencoded or specific format depending on implementation,
      // but standard JSON is often supported if doPost is programmed correctly.
      await axios.post(SCRIPT_URL, {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toLocaleString()
      });

      res.json({ success: true });
    } catch (error: any) {
      console.error('Google Apps Script Error:', error.message);
      res.status(500).json({ error: 'Failed to submit to Google Sheets via Apps Script' });
    }
  });

  // TMDB API Proxy
  app.get('/api/movies/trending', async (req, res) => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/trending/movie/week', {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
          accept: 'application/json'
        }
      });
      res.json(response.data);
    } catch (error: any) {
      console.error('TMDB API Error:', error.message);
      res.status(500).json({ error: 'Failed to fetch trending movies' });
    }
  });

  app.get('/api/shows/trending', async (req, res) => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/trending/tv/week', {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
          accept: 'application/json'
        }
      });
      res.json(response.data);
    } catch (error: any) {
      console.error('TMDB API Error:', error.message);
      res.status(500).json({ error: 'Failed to fetch trending shows' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
