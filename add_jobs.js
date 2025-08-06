const mysql = require('mysql2');
require('dotenv').config();

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Sample job data with diverse companies and positions
const newJobs = [
  // Technology Companies
  {
    name: 'Netflix',
    role: 'Frontend Developer',
    location: 'Remote',
    industry: 'Entertainment',
    job_description: 'Build responsive web applications using React and modern JavaScript frameworks. Collaborate with design and backend teams.',
    stipend: '?120,000/month',
    work_hours: '40/week',
    reallocation_bonus: '?150,000',
    contact_number: '+91-9000000011',
    flexibility: 'Online'
  },
  {
    name: 'Spotify',
    role: 'Backend Engineer',
    location: 'Remote/Office',
    industry: 'Music',
    job_description: 'Develop scalable backend services using Node.js and Python. Work on music recommendation algorithms.',
    stipend: '?110,000/month',
    work_hours: '40/week',
    reallocation_bonus: '?140,000',
    contact_number: '+91-9000000012',
    flexibility: 'Both'
  },
  {
    name: 'Uber',
    role: 'Mobile App Developer',
    location: 'Office',
    industry: 'Transportation',
    job_description: 'Develop iOS and Android applications for ride-sharing platform. Focus on user experience and performance.',
    stipend: '?130,000/month',
    work_hours: '42/week',
    reallocation_bonus: '?160,000',
    contact_number: '+91-9000000013',
    flexibility: 'Offline'
  },
  {
    name: 'Airbnb',
    role: 'Full Stack Developer',
    location: 'Remote',
    industry: 'Hospitality',
    job_description: 'Build features for the accommodation booking platform. Work with React, Node.js, and PostgreSQL.',
    stipend: '?125,000/month',
    work_hours: '40/week',
    reallocation_bonus: '?155,000',
    contact_number: '+91-9000000014',
    flexibility: 'Online'
  },
  {
    name: 'LinkedIn',
    role: 'Data Engineer',
    location: 'Remote/Office',
    industry: 'Professional Networking',
    job_description: 'Design and maintain data pipelines. Work with big data technologies like Hadoop and Spark.',
    stipend: '?135,000/month',
    work_hours: '40/week',
    reallocation_bonus: '?170,000',
    contact_number: '+91-9000000015',
    flexibility: 'Both'
  },
  
  // Finance Companies
  {
    name: 'Goldman Sachs',
    role: 'Quantitative Analyst',
    location: 'Office',
    industry: 'Investment Banking',
    job_description: 'Develop mathematical models for risk assessment and trading strategies. Use Python and financial modeling.',
    stipend: '?140,000/month',
    work_hours: '45/week',
    reallocation_bonus: '?180,000',
    contact_number: '+91-9000000016',
    flexibility: 'Offline'
  },
  {
    name: 'Morgan Stanley',
    role: 'Software Engineer',
    location: 'Office',
    industry: 'Financial Services',
    job_description: 'Build trading platforms and financial software. Work with Java, C++, and real-time systems.',
    stipend: '?145,000/month',
    work_hours: '45/week',
    reallocation_bonus: '?185,000',
    contact_number: '+91-9000000017',
    flexibility: 'Offline'
  },
  {
    name: 'Stripe',
    role: 'Security Engineer',
    location: 'Remote',
    industry: 'Fintech',
    job_description: 'Implement security measures for payment processing systems. Conduct security audits and penetration testing.',
    stipend: '?130,000/month',
    work_hours: '40/week',
    reallocation_bonus: '?165,000',
    contact_number: '+91-9000000018',
    flexibility: 'Online'
  },
  
  // Healthcare Companies
  {
    name: 'Pfizer',
    role: 'Bioinformatics Scientist',
    location: 'Office',
    industry: 'Pharmaceuticals',
    job_description: 'Analyze genomic data for drug discovery. Develop algorithms for protein structure prediction.',
    stipend: '?115,000/month',
    work_hours: '40/week',
    reallocation_bonus: '?145,000',
    contact_number: '+91-9000000019',
    flexibility: 'Offline'
  },
  {
    name: 'Moderna',
    role: 'Research Scientist',
    location: 'Office',
    industry: 'Biotechnology',
    job_description: 'Conduct research on mRNA technology and vaccine development. Collaborate with clinical teams.',
    stipend: '?120,000/month',
    work_hours: '40/week',
    reallocation_bonus: '?150,000',
    contact_number: '+91-9000000020',
    flexibility: 'Offline'
  },
  
  // E-commerce Companies
  {
    name: 'Shopify',
    role: 'DevOps Engineer',
    location: 'Remote',
    industry: 'E-commerce',
    job_description: 'Manage cloud infrastructure and deployment pipelines. Work with AWS, Docker, and Kubernetes.',
    stipend: '?125,000/month',
    work_hours: '40/week',
    reallocation_bonus: '?155,000',
    contact_number: '+91-9000000021',
    flexibility: 'Online'
  },
  {
    name: 'Amazon',
    role: 'Product Manager',
    location: 'Remote/Office',
    industry: 'E-commerce',
    job_description: 'Lead product development for seller tools and buyer experience. Define product strategy and roadmap.',
    stipend: '?135,000/month',
    work_hours: '40/week',
    reallocation_bonus: '?170,000',
    contact_number: '+91-9000000022',
    flexibility: 'Both'
  },
  
  // Consulting Companies
  {
    name: 'McKinsey & Company',
    role: 'Business Analyst',
    location: 'Office',
    industry: 'Consulting',
    job_description: 'Analyze business problems and develop strategic solutions. Work with clients across various industries.',
    stipend: '?110,000/month',
    work_hours: '50/week',
    reallocation_bonus: '?140,000',
    contact_number: '+91-9000000023',
    flexibility: 'Offline'
  },
  {
    name: 'Boston Consulting Group',
    role: 'Associate Consultant',
    location: 'Office',
    industry: 'Management Consulting',
    job_description: 'Support client engagements with data analysis and strategic recommendations. Develop presentation materials.',
    stipend: '?115,000/month',
    work_hours: '50/week',
    reallocation_bonus: '?145,000',
    contact_number: '+91-9000000024',
    flexibility: 'Offline'
  },
  
  // Gaming Companies
  {
    name: 'Electronic Arts',
    role: 'Game Developer',
    location: 'Office',
    industry: 'Gaming',
    job_description: 'Develop video games using Unity or Unreal Engine. Create engaging gameplay mechanics and features.',
    stipend: '?100,000/month',
    work_hours: '40/week',
    reallocation_bonus: '?130,000',
    contact_number: '+91-9000000025',
    flexibility: 'Offline'
  },
  {
    name: 'Activision Blizzard',
    role: 'UI/UX Designer',
    location: 'Remote/Office',
    industry: 'Gaming',
    job_description: 'Design user interfaces for video games. Create wireframes, prototypes, and visual designs.',
    stipend: '?95,000/month',
    work_hours: '40/week',
    reallocation_bonus: '?125,000',
    contact_number: '+91-9000000026',
    flexibility: 'Both'
  },
  
  // Automotive Companies
  {
    name: 'Ford',
    role: 'Autonomous Vehicle Engineer',
    location: 'Office',
    industry: 'Automotive',
    job_description: 'Develop self-driving car technology. Work with sensors, machine learning, and robotics.',
    stipend: '?140,000/month',
    work_hours: '42/week',
    reallocation_bonus: '?180,000',
    contact_number: '+91-9000000027',
    flexibility: 'Offline'
  },
  {
    name: 'BMW',
    role: 'Electric Vehicle Engineer',
    location: 'Office',
    industry: 'Automotive',
    job_description: 'Design and develop electric vehicle systems. Work on battery technology and powertrain systems.',
    stipend: '?135,000/month',
    work_hours: '42/week',
    reallocation_bonus: '?175,000',
    contact_number: '+91-9000000028',
    flexibility: 'Offline'
  },
  
  // Energy Companies
  {
    name: 'Tesla',
    role: 'Solar Engineer',
    location: 'Office',
    industry: 'Renewable Energy',
    job_description: 'Design solar energy systems and battery storage solutions. Optimize energy efficiency.',
    stipend: '?120,000/month',
    work_hours: '40/week',
    reallocation_bonus: '?150,000',
    contact_number: '+91-9000000029',
    flexibility: 'Offline'
  },
  {
    name: 'NextEra Energy',
    role: 'Wind Energy Analyst',
    location: 'Remote/Office',
    industry: 'Energy',
    job_description: 'Analyze wind farm performance and optimize energy production. Use data analytics and modeling.',
    stipend: '?110,000/month',
    work_hours: '40/week',
    reallocation_bonus: '?140,000',
    contact_number: '+91-9000000030',
    flexibility: 'Both'
  },
  
  // Media Companies
  {
    name: 'Disney',
    role: 'Content Strategist',
    location: 'Remote/Office',
    industry: 'Entertainment',
    job_description: 'Develop content strategies for streaming platforms. Analyze viewer data and trends.',
    stipend: '?105,000/month',
    work_hours: '40/week',
    reallocation_bonus: '?135,000',
    contact_number: '+91-9000000031',
    flexibility: 'Both'
  },
  {
    name: 'Warner Bros Discovery',
    role: 'Digital Marketing Specialist',
    location: 'Remote',
    industry: 'Media',
    job_description: 'Create digital marketing campaigns for movies and TV shows. Manage social media presence.',
    stipend: '?90,000/month',
    work_hours: '40/week',
    reallocation_bonus: '?120,000',
    contact_number: '+91-9000000032',
    flexibility: 'Online'
  }
];

// Function to insert jobs
function insertJobs() {
  db.connect((err) => {
    if (err) {
      console.error('Database connection failed:', err.stack);
      return;
    }
    console.log('Connected to database.');
    
    // Insert each job
    newJobs.forEach((job, index) => {
      const query = `
        INSERT INTO companies (name, role, location, industry, job_description, stipend, work_hours, reallocation_bonus, contact_number, flexibility) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      const values = [
        job.name,
        job.role,
        job.location,
        job.industry,
        job.job_description,
        job.stipend,
        job.work_hours,
        job.reallocation_bonus,
        job.contact_number,
        job.flexibility
      ];
      
      db.query(query, values, (err, result) => {
        if (err) {
          console.error(`Error inserting job ${index + 1} (${job.name}):`, err);
        } else {
          console.log(`Successfully inserted job ${index + 1}: ${job.name} - ${job.role}`);
        }
        
        // Close connection after last job
        if (index === newJobs.length - 1) {
          db.end();
          console.log('All jobs have been processed.');
        }
      });
    });
  });
}

// Run the script
insertJobs(); 