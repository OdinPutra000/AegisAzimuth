const mongoose = require('mongoose');

const constituencySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  state: { type: String, required: true },
  totalVoters: { type: Number, default: 0 },
  type: { type: String, enum: ['General', 'SC', 'ST'], default: 'General' },
  demographics: {
    urban: { type: Number }, // percentage
    rural: { type: Number }, // percentage
    literacyRate: { type: Number }
  }
});

const electionResultSchema = new mongoose.Schema({
  constituency: { type: mongoose.Schema.Types.ObjectId, ref: 'Constituency', required: true },
  year: { type: Number, required: true },
  totalVotesPolled: { type: Number },
  turnoutPercentage: { type: Number },
  results: [{
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' },
    party: { type: mongoose.Schema.Types.ObjectId, ref: 'Party' },
    votes: { type: Number },
    percentage: { type: Number },
    isWinner: { type: Boolean, default: false }
  }],
  aiSummary: { type: String },
  swingAnalysis: {
    fromParty: { type: mongoose.Schema.Types.ObjectId, ref: 'Party' },
    swingValue: { type: Number }
  }
});

const Constituency = mongoose.model('Constituency', constituencySchema);
const ElectionResult = mongoose.model('ElectionResult', electionResultSchema);

module.exports = { Constituency, ElectionResult };
