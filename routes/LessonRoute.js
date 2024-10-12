const express = require('express');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/NewFile', upload.single('syllabus'))

module.exports = router;