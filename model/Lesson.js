const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    content: { type: String, required: true },
    timeDaysForCompletion: { type: String },
    techStandards: { type: String },
    objectives: { type: [String] },
    curriculumIntegration: { type: [String] },
    sequence: {
        hook: { type: String },
        input: { type: String },
        modeling: { type: String },
        guidedPractice: { type: String },
        independentPractice: { type: String }
    },
    accommodations: { type: [String] }
}, { 
    timestamps: true
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
