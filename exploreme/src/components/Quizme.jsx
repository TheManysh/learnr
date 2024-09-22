'use client';

import React, { useState } from 'react';

const QuizMe = ({ questions }) => {
	const [selectedAnswers, setSelectedAnswers] = useState({});
	const [isAnswerCorrect, setIsAnswerCorrect] = useState({});
	const [savedTimestamp, setSavedTimestamp] = useState(null);

	const handleAnswerSelect = (questionIndex, option) => {
		const isCorrect = option.trim() === questions[questionIndex].answer.trim();
		setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: option }));
		setIsAnswerCorrect((prev) => ({ ...prev, [questionIndex]: isCorrect }));
		setSavedTimestamp(questions[questionIndex].startTime);
	};

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
	};

	const playVideoFromTimestamp = (videoId, timestamp) => {
		const url = `https://www.youtube.com/embed/${videoId}?start=${timestamp}`;
		window.open(url, '_blank');
	};

	return (
		<div className='p-4'>
			<div className='space-y-6'>
				{questions.map((q, index) => {
					const startTimeInSeconds = q.startTime;
					return (
						<div
							key={index}
							className={`border p-4 rounded-md shadow-md transition-all duration-500 
                                ${
																	selectedAnswers[index]
																		? isAnswerCorrect[index]
																			? 'shadow-green-500'
																			: 'shadow-red-500'
																		: 'shadow-lg'
																}`}
						>
							<div className='flex items-center justify-between mb-2'>
								<h2 className='text-xl font-semibold text-gray-800'>
									{q.question}
								</h2>
								<button
									onClick={() =>
										playVideoFromTimestamp(q.videoId, startTimeInSeconds)
									}
									className='text-sm text-blue-500 underline'
								>
									Start second: {startTimeInSeconds}
								</button>
							</div>
							<div className='mt-2 space-y-2'>
								{q.options.map((option, i) => (
									<label
										key={i}
										className='block p-2 transition-all bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200'
									>
										<input
											type='radio'
											name={`question-${index}`}
											value={option}
											className='mr-2'
											checked={selectedAnswers[index] === option}
											onChange={() => handleAnswerSelect(index, option)}
										/>
										{option}
									</label>
								))}
							</div>
							{selectedAnswers[index] && (
								<div
									className={`mt-4 text-lg font-medium ${
										isAnswerCorrect[index] ? 'text-green-600' : 'text-red-600'
									}`}
								>
									{isAnswerCorrect[index]
										? 'Correct!'
										: `Wrong! The correct answer is ${q.answer}.`}
								</div>
							)}
						</div>
					);
				})}
			</div>
			{savedTimestamp !== null && (
				<div className='mt-4 text-lg font-medium text-blue-600'>
					<button
						onClick={() =>
							playVideoFromTimestamp('YOUR_VIDEO_ID', savedTimestamp)
						}
						className='text-sm text-blue-500 underline'
					>
						Play video from: {formatTime(savedTimestamp)}
					</button>
				</div>
			)}
		</div>
	);
};

export default QuizMe;
