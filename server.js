const cluster = require('cluster');
const os = require('os');
const http = require('http');

const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();


//---------------------------- App
// Define the destination folder for uploaded files
const uploadDirectory = path.join(__dirname, 'uploads');

// Create a multer middleware to handle file uploads
// const upload = multer({ dest: 'uploads/' });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, path.parse(file.originalname).name + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

// Define a route to handle file uploads
app.post('/upload', upload.array('images'), (req, res) => {

  console.log(`Worker ${process.pid} uploaded ${req.files.length} images`);

  if (!req.files || req.files.length === 0) {
    res.status(400).send('No files uploaded.');
    return;
  }

  const filenames = req.files.map(file => file.originalname);
  res.send(`Files uploaded successfully. Filenames: ${filenames.join(', ')}`);
});


//---------------------------- Clusters
if (cluster.isMaster) {
    // If this is the master process, create a worker for each CPU core
    const numWorkers = os.cpus().length;
    console.log(`There are  ${numWorkers} cpus`);
    console.log(`Master ${process.pid} is running`);
  
    for (let i = 0; i < numWorkers; i++) {
      cluster.fork();
    }
  
    // Listen for worker exit events
    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`);
      console.log(`Creating a new worker...`);
      cluster.fork();
    });
  } else {
    // If this is a worker process, start the server
    app.listen(3001, () => {
      console.log(`Worker ${process.pid} started. Listening on port 3001...`);
    });
  }