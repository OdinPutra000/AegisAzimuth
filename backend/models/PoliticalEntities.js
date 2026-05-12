const mongoose = require('mongoose');

const partySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  shortName: { type: String, required: true },
  logo: { type: String }, // URL to logo
  color: { type: String, default: '#3b82f6' }, // Hex color for charts
  leader: { type: String },
  foundedYear: { type: Number },
  ideology: { type: String }
});

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  party: { type: mongoose.Schema.Types.ObjectId, ref: 'Party', required: true },
  constituency: { type: String, required: true },
  age: { type: Number },
  education: { type: String },
  assets: { type: Number },
  criminalRecords: { type: Number, default: 0 },
  image: { type: String }
});

const Party = mongoose.model('Party', partySchema);
const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = { Party, Candidate };
