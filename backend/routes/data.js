const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');
const { uploadCSV, getConstituencies, getResults } = require('../controllers/dataController');

const upload = multer({ dest: 'uploads/' });

router.post('/upload', auth(['admin', 'analyst']), upload.single('file'), uploadCSV);
router.get('/constituencies', getConstituencies);
router.get('/results', getResults);

module.exports = router;
