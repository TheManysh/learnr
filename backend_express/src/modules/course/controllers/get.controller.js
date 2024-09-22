import { Course } from '../models/course.model.js';
export async function getCourses(req, res) {
	try {
		const courses = await Course.find().populate('created_by');
		return res.status(200).json(courses);
	} catch (error) {
		return res
			.status(500)
			.json({ message: 'Internal Server Error', error: error.message });
	}
}

// Function to get a course by ID
export async function getCourseById(req, res) {
	try {
		const courseId = req.params.id;
		const course = await Course.findById(courseId)
			.populate('created_by')
			.populate('video_id');

		if (!course) {
			return res.status(404).json({ message: 'Course not found.' });
		}

		return res.status(200).json(course);
	} catch (error) {
		return res
			.status(500)
			.json({ message: 'Internal Server Error', error: error.message });
	}
}
