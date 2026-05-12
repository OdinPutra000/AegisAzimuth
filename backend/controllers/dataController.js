const fs = require('fs');
const csv = require('csv-parser');
const { Constituency, ElectionResult } = require('../models/ElectionData');
const { Candidate, Party } = require('../models/PoliticalEntities');

exports.uploadCSV = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        // Process data (simplified for now)
        // In a real app, you'd validate and map each row to models
        console.log(`Processed ${results.length} rows`);
        
        // Mock processing success
        res.json({ 
          message: 'File processed successfully', 
          rowCount: results.length,
          data: results.slice(0, 5) // Return first 5 for verification
        });
      } catch (err) {
        res.status(500).json({ message: err.message });
      } finally {
        fs.unlinkSync(req.file.path); // Clean up file
      }
    });
};

exports.getConstituencies = async (req, res) => {
  try {
    const data = await Constituency.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getResults = async (req, res) => {
  try {
    const data = await ElectionResult.find().populate('constituency').populate('results.party');
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
