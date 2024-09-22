import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema(
	{
		question: { type: String, required: true },
		options: [{ type: String, required: true }],
		answer: { type: String, required: true },
		video_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Video',
			required: true,
		},
		startTime: { type: String, required: true }, // New field for start time
	},
	{ timestamps: true }
);

export const Quiz = mongoose.model('Quiz', quizSchema);
