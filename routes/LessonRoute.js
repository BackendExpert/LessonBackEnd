const express = require('express');
const upload = require('../middleware/uploadMiddleware');
const LessonController = require('../controller/LessonController');

const router = express.Router();

router.post('/NewFile', upload.single('syllabus'), LessonController.CreateLesson)
router.get('/AllLessons', LessonController.GetAllLessons)
router.get('/OneLesson/:LessonId', LessonController.GetOneLesson)
router.get('/OneLessonData/:LessonId', LessonController.GetOneLessonData)

module.exports = router;