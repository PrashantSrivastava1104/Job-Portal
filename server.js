const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'jobportal_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true }
}));

// MySQL database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// API endpoint to get companies
app.get('/api/companies', (req, res) => {
    db.query('SELECT * FROM companies', (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: 'Database query failed' });
      }
      
      // Process the data to remove question marks and add USD symbol, remove reallocation bonus for online jobs
      const processedResults = results.map(company => ({
        ...company,
        stipend: company.stipend === '?' ? '' : (company.stipend ? `$${company.stipend.replace(/^\?/, '')}` : ''),
        reallocation_bonus: (company.flexibility === 'Online' || company.flexibility === 'online') ? 'NIL' : 
          (company.reallocation_bonus === '?' ? '' : (company.reallocation_bonus ? `$${company.reallocation_bonus.replace(/^\?/, '')}` : ''))
      }));
      
      console.log('Companies data:', processedResults);
      res.json(processedResults);
    });
  });

// API endpoint to get jobs
app.get('/api/jobs', (req, res) => {
    db.query('SELECT * FROM jobs', (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: 'Database query failed' });
      }
      
      // Process the data to remove question marks and add USD symbol, remove reallocation bonus for online jobs
      const processedResults = results.map(job => ({
        ...job,
        stipend: job.stipend === '?' ? '' : (job.stipend ? `$${job.stipend.replace(/^\?/, '')}` : ''),
        reallocation_bonus: (job.flexibility === 'Online' || job.flexibility === 'online') ? 'NIL' : 
          (job.reallocation_bonus === '?' ? '' : (job.reallocation_bonus ? `$${job.reallocation_bonus.replace(/^\?/, '')}` : ''))
      }));
      
      console.log('Jobs data:', processedResults);
      res.json(processedResults);
    });
  });

// API endpoint to get all data (companies and jobs combined)
app.get('/api/all-data', (req, res) => {
    // First get companies
    db.query('SELECT * FROM companies', (err, companies) => {
      if (err) {
        console.error('Companies query error:', err);
        return res.status(500).json({ error: 'Companies query failed' });
      }
      
      // Then get jobs
      db.query('SELECT * FROM jobs', (err, jobs) => {
        if (err) {
          console.error('Jobs query error:', err);
          return res.status(500).json({ error: 'Jobs query failed' });
        }
        
        // Process the data to remove question marks and add USD symbol, remove reallocation bonus for online jobs
        const processedCompanies = companies.map(company => ({
          ...company,
          stipend: company.stipend === '?' ? '' : (company.stipend ? `$${company.stipend.replace(/^\?/, '')}` : ''),
          reallocation_bonus: (company.flexibility === 'Online' || company.flexibility === 'online') ? 'NIL' : 
            (company.reallocation_bonus === '?' ? '' : (company.reallocation_bonus ? `$${company.reallocation_bonus.replace(/^\?/, '')}` : ''))
        }));
        
        const processedJobs = jobs.map(job => ({
          ...job,
          stipend: job.stipend === '?' ? '' : (job.stipend ? `$${job.stipend.replace(/^\?/, '')}` : ''),
          reallocation_bonus: (job.flexibility === 'Online' || job.flexibility === 'online') ? 'NIL' : 
            (job.reallocation_bonus === '?' ? '' : (job.reallocation_bonus ? `$${job.reallocation_bonus.replace(/^\?/, '')}` : ''))
        }));
        
        console.log('Companies:', processedCompanies);
        console.log('Jobs:', processedJobs);
        
        res.json({
          companies: processedCompanies,
          jobs: processedJobs
        });
      });
    });
  });

// Registration endpoint (with password hashing and duplicate checks)
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  // Check for duplicate username or email
  db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Database query failed' });
    if (results.length > 0) {
      const user = results[0];
      if (user.username === username) {
        return res.status(409).json({ error: 'Username already exists', field: 'username' });
      }
      if (user.email === email) {
        return res.status(409).json({ error: 'Email already exists', field: 'email' });
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Registration DB error:', err);
        return res.status(500).json({ error: 'Failed to register user: ' + err.message });
      }
      res.json({ success: true, message: 'User registered successfully' });
    });
  });
});

// Login endpoint (with password check and session, specific error messages)
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Database query failed' });
    if (results.length === 0) return res.status(401).json({ error: 'Username not found', field: 'username' });
    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Incorrect password', field: 'password' });
    req.session.user = { id: user.id, username: user.username };
    res.json({ success: true, message: 'Login successful', user: { username: user.username } });
  });
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true, message: 'Logged out' });
  });
});

// Check login status
app.get('/api/me', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

// Middleware to protect routes
function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
}

// Example protected route (for job application)
app.post('/api/apply-job', requireLogin, (req, res) => {
  // ... handle job application ...
  res.json({ success: true, message: 'Job application submitted!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 