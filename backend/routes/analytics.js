const express = require('express');
const router = express.Router();
const { getAISummary, getSentimentAnalysis, getPredictiveInsights } = require('../controllers/analyticsController');

router.post('/summary', getAISummary);
router.post('/sentiment', getSentimentAnalysis);
router.get('/forecast', getPredictiveInsights);

module.exports = router;
