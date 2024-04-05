import mongoose from 'mongoose';

const LectureSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true, // Assuming subject is required (add if needed)
  },
  audio: {
    type: String,
  },
  transcript: {
    type: String,
  },
});

export default mongoose.model('lecture', LectureSchema);

