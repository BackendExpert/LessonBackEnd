const Lesson = require("../model/Lesson");
const pdfParse = require('pdf-parse');

const LessonController = {
    CreateLesson: async(req, res) => {
        try{
            const pdfBuffer = req.file.buffer;
            // console.log(pdfBuffer)
            const data = await pdfParse(pdfBuffer);

            const lessons = extractLessons(data.text);

            const savedLessons = await Lesson.insertMany(lessons);

            return res.json({ Status: "Success"})
        }
        catch(err){
            console.log(err)
        }
    },

    GetAllLessons: async(req, res) => {
        try{
            const allLessons = await Lesson.find()

            return res.json({ Result: allLessons })
        }
        catch(err){
            console.log(err)
        }
    },

    GetOneLesson: async(req, res ) => {
        try{
            const LessonID = req.params.LessonId

            // console.log(LessonID)

            const FindOneLesson = await Lesson.findById(LessonID)

            return res.json({ Result: FindOneLesson })
        }
        catch(err){
            console.log(err)
        }
    }
};

const extractLessons = (pdfText) => {
    const lessons = [];
    const sections = pdfText.split(/(?=Lesson Title:)/); 
    
    sections.forEach(section => {
        const titleMatch = section.match(/Lesson Title:\s*(.+)/);
        const subtitleMatch = section.match(/Subtitle:\s*(.+)/);
        const contentMatch = section.match(/Content:\s*([\s\S]+?)(?=Time\/Days for Completion:|$)/);
        const timeDaysMatch = section.match(/Time\/Days for Completion:\s*(.+)/);
        const techStandardsMatch = section.match(/Technology\/Web Development Standards:\s*([\s\S]+?)(?=Objectives:|$)/);
        const objectivesMatch = section.match(/Objectives:\s*([\s\S]+?)(?=Areas of Curriculum Integration:|$)/);
        const curriculumMatch = section.match(/Areas of Curriculum Integration:\s*(.+)/);
        const sequenceMatch = section.match(/Sequence of Lesson:\s*([\s\S]+?)(?=Adaptations\/Accommodations:|$)/);
        const accommodationsMatch = section.match(/Adaptations\/Accommodations:\s*(.+)/);

        if (titleMatch && subtitleMatch && contentMatch) {
            const lesson = {
                title: titleMatch[1].trim(),
                subtitle: subtitleMatch[1].trim(),
                content: contentMatch[1].trim(),
                timeDaysForCompletion: timeDaysMatch ? timeDaysMatch[1].trim() : "",
                techStandards: techStandardsMatch ? techStandardsMatch[1].trim() : "",
                objectives: objectivesMatch ? objectivesMatch[1].trim().split(/\n|, /) : [],
                curriculumIntegration: curriculumMatch ? curriculumMatch[1].trim().split(/, /) : [],
                sequence: sequenceMatch ? parseSequence(sequenceMatch[1].trim()) : {},
                accommodations: accommodationsMatch ? accommodationsMatch[1].trim().split(/\n|, /) : []
            };
            lessons.push(lesson);
        }
    });
    return lessons;
};


const parseSequence = (sequenceText) => {
    const sequence = {};
    sequence.hook = sequenceText.match(/Hook:\s*([\s\S]+?)(?=Input:|$)/)?.[1].trim() || "";
    sequence.input = sequenceText.match(/Input:\s*([\s\S]+?)(?=Modeling:|$)/)?.[1].trim() || "";
    sequence.modeling = sequenceText.match(/Modeling:\s*([\s\S]+?)(?=Guided Practice:|$)/)?.[1].trim() || "";
    sequence.guidedPractice = sequenceText.match(/Guided Practice:\s*([\s\S]+?)(?=Independent Practice:|$)/)?.[1].trim() || "";
    sequence.independentPractice = sequenceText.match(/Independent Practice:\s*(.+)/)?.[1].trim() || "";
    return sequence;
};

module.exports = LessonController;