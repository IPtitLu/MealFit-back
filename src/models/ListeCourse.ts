import mongoose from 'mongoose';

const listeCourseSchema = new mongoose.Schema({
  identifiantUtilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dateCreation: { type: Date, required: true },
  articlesCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ListeArticles' }]
});

const ListeCourse = mongoose.model('ListeCourse', listeCourseSchema);

export default ListeCourse;
