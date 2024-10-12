const express = require('express');
const upload = require('../middleware/uploadMiddleware');
const LessonController = require('../controller/LessonController');

const router = express.Router();

router.post('/NewFile', upload.single('syllabus'), LessonController.CreateLesson)
router.get('/AllLessons')

module.exports = router;