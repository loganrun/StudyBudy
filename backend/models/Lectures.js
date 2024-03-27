const mongoose = require('mongoose');

const LectureSchema = new mongoose.Schema({
  subject: {
    type: String,
    
  },
  
  audio: {
    type: String,

  },
  transcript: {
    type: String,

  },
});

module.exports = Lecture = mongoose.model('lecture', LectureSchema);
