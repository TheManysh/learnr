'use client';
import { Button } from '@/components/ui/button';
import { PauseCircleIcon, PlayCircleIcon } from 'lucide-react';
import React, { useRef, useState, useEffect } from 'react';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { createQuiz, getQuizByVideoId } from '@/app/services/api_services';
import { useParams } from 'next/navigation';
import ScaleLoader from 'react-spinners/ScaleLoader';

const audios = [
	{
		lang: 'Default',
		src: '/default.wav',
	},
	{
		lang: 'Nepali',
		src: '/nepali_audio.wav',
	},
];

export default function VideoPage({ params }) {
	const [audioFiles, setAudioFiles] = useState(audios);
	const [selectedAudio, setSelectedAudio] = useState(audios[0]);

	const [timestamp, setTimestamp] = useState(0);
	const videoRef = useRef(null);
	const audioRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const { videoid } = useParams();
	const [quiz, setQuiz] = useState(null);
	const [converting, setConverting] = useState(false);
	const [selectedAnswers, setSelectedAnswers] = useState({});
	const [isAnswerCorrect, setIsAnswerCorrect] = useState({});
	const [savedTimestamp, setSavedTimestamp] = useState(null);
	const [showTranslationLanguage, setShowTranslationLanguage] = useState(false);

	const handleAnswerSelect = (questionIndex, option) => {
		const isCorrect =
			option.trim() === quiz.quizzes[questionIndex].answer.trim();
		setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: option }));
		setIsAnswerCorrect((prev) => ({ ...prev, [questionIndex]: isCorrect }));
		setSavedTimestamp(quiz.quizzes[questionIndex].startTime);
	};

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
	};

	// set the converting to false after 10 seconds
	const convertingFeature = () => {
		const timer = setTimeout(() => {
			setConverting(false);
			setShowTranslationLanguage(false);
			setAudioFiles((prev) => [
				...prev,
				{ lang: 'Hindi', src: '/hindi_audio.wav' },
			]);
		}, 10000);
		return () => clearTimeout(timer);
	};

	// load quiz
	useEffect(() => {
		getQuizByVideoId(videoid)
			.then((data) => {
				setQuiz(data);
				console.log(data);
			})
			.catch((error) => {
				console.error('Error fetching quiz:', error);
			});
	}, []);

	// load to the timestamp
	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.currentTime = timestamp;
		}
		// Seek both video and audio to the initial timestamp on load
		if (videoRef.current) {
			const iframe = videoRef.current;
			iframe.contentWindow.postMessage(
				`{"event":"command","func":"seekTo","args":[${timestamp}, true]}`,
				'*'
			);
		}
	}, [timestamp]);

	// handle audio change
	const handleAudioChange = (event) => {
		const selectedOption = event.target.value;
		const selectedAudioFile = audioFiles.find(
			(audio) => audio.lang === selectedOption
		);
		if (selectedAudioFile && audioRef.current) {
			audioRef.current.src = selectedAudioFile.src;
			audioRef.current.load(); // Reload the audio element to apply the new source
		}
		setTimestamp(0);
		setSelectedAudio(selectedOption);
		setIsPlaying(false);
	};

	// handle seek
	const handleSeek = (event) => {
		const time = Number(event.target.value);
		setTimestamp(time);
		if (audioRef.current) {
			audioRef.current.currentTime = time;
		}
		if (videoRef.current) {
			const iframe = videoRef.current;
			iframe.contentWindow.postMessage(
				`{"event":"command","func":"seekTo","args":[${timestamp}, true]}`,
				'*'
			);
		}
	};

	// handle play
	const handlePlay = () => {
		if (audioRef.current) {
			audioRef.current.play();
		}
		setIsPlaying(true);
		if (videoRef.current) {
			const iframe = videoRef.current;
			iframe.contentWindow.postMessage(
				`{"event":"command","func":"playVideo","args":[]}`,
				'*'
			);
		}
	};

	print;

	// handle pause
	const handlePause = () => {
		if (audioRef.current) {
			audioRef.current.pause();
		}
		setIsPlaying(false);
		if (videoRef.current) {
			const iframe = videoRef.current;
			iframe.contentWindow.postMessage(
				`{"event":"command","func":"pauseVideo","args":[]}`,
				'*'
			);
		}
	};

	return (
		<div className='flex flex-col items-center w-full h-[600px] item-center'>
			<h1 className='pb-4 text-xl font-semibold text-blue-600'>
				Learning Fractions
			</h1>
			<div className='w-4/5 h-4/5'>
				<div className='relative flex items-center justify-center w-full h-full'>
					{/* translation menu */}
					{showTranslationLanguage && (
						<div className='absolute z-50 bg-white rounded-lg shadow-lg w-60'>
							<div className='p-3 border-gray-300'>
								<p>Select language</p>
							</div>
							{converting ? (
								<div className='flex flex-col items-center justify-center p-3'>
									<ScaleLoader
										color={'#232358'}
										loading={converting}
										size={50}
										aria-label='Loading Spinner'
										data-testid='loader'
									/>
									<p>Conversion in progress</p>
								</div>
							) : (
								<div className='p-1'>
									<ul>
										<li
											onClick={() => {
												setConverting(true);
												convertingFeature();
											}}
											className='p-2 rounded-lg hover:bg-gray-100'
										>
											<a href='#'>Nepali</a>
										</li>
										<li
											onClick={() => {
												setConverting(true);
												convertingFeature();
											}}
											className='p-2 rounded-lg hover:bg-gray-100'
										>
											<a href='#'>Hindi</a>
										</li>
									</ul>
								</div>
							)}
						</div>
					)}
					<div className='absolute inset-0 z-10 w-full h-full bg-transparent'></div>
					<iframe
						ref={videoRef}
						height={'100%'}
						width={'100%'}
						src={
							selectedAudio.src === '/default.wav'
								? 'https://www.youtube.com/embed/4PlkCiEXBQI?enablejsapi=1&mute=1' +
								  (timestamp ? `&start=${timestamp}` : '')
								: selectedAudio.src === '/nepali_audio.wav'
								? 'https://www.youtube.com/embed/4PlkCiEXBQI?enablejsapi=1&mute=1&a="nepali" ' +
								  (timestamp ? `&start=${timestamp}` : '')
								: 'https://www.youtube.com/embed/4PlkCiEXBQI?enablejsapi=1&mute=1&a="hindi" ' +
								  (timestamp ? `&start=${timestamp}` : '')
						}
						onPause={() => setIsPlaying(false)}
					/>
				</div>
				<div className='flex items-center gap-6 mt-5'>
					<div className='hidden'>
						{/* Audio Element */}
						<audio ref={audioRef} controls>
							<source src={selectedAudio.src} type='audio/wav' />
							Your browser does not support the audio element.
						</audio>
					</div>
					<div className='flex items-center gap-5'>
						<div>
							{isPlaying ? (
								<Button
									onClick={handlePause}
									className='bg-red-700 p-3 w-[100px] rounded-xl hover:scale-x-105 hover:text-gray-200 hover:bg-red-800 transition-all duration-500 flex items-center gap-2'
								>
									Pause <PauseCircleIcon className='w-6 h-6' />
								</Button>
							) : (
								<Button
									onClick={handlePlay}
									className='bg-green-700 p-3 w-[100px] rounded-xl hover:scale-x-105 hover:text-gray-200 hover:bg-green-800 transition-all duration-500 flex items-center gap-2'
								>
									Play <PlayCircleIcon />
								</Button>
							)}
						</div>
					</div>
					<div>
						<Button
							onClick={setShowTranslationLanguage}
							className='p-3 transition-all duration-500 bg-blue-500 rounded-xl hover:scale-x-105 hover:text-gray-200 hover:bg-blue-700'
						>
							Add translation
						</Button>
					</div>
					<select
						className='p-2 text-gray-700 transition duration-300 ease-in-out border border-gray-300 rounded-lg shadow-sm cursor-pointer bg-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 hover:bg-slate-200'
						onChange={handleAudioChange}
					>
						{audioFiles.map((audio) => (
							<option
								className='p-2 text-gray-700 transition duration-200 ease-in-out hover:bg-blue-100 focus:bg-blue-100'
								key={audio.lang}
								value={audio.lang}
							>
								{audio.lang}
							</option>
						))}
					</select>
					<div>
						<Sheet className='w-[300px]'>
							<SheetTrigger className='bg-black text-white p-2 w-[120px] rounded-xl hover:scale-x-105 hover:text-gray-200 transition-all duration-500'>
								Quiz Me
							</SheetTrigger>
							<SheetContent className='overflow-y-scroll'>
								<SheetHeader>
									<SheetTitle className='flex items-center justify-center gap-4 mb-4 text-2xl font-semibold text-blue-600'>
										QuizMe
									</SheetTitle>
									<SheetDescription>
										<div className='p-4'>
											<div className='space-y-6'>
												{quiz?.quizzes.map((q, index) => {
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
																	onClick={() => {
																		setTimestamp(q.startTime);
																		setIsPlaying(false);
																		if (audioRef.current) {
																			audioRef.current.currentTime =
																				q.startTime;
																		}
																	}}
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
																			checked={
																				selectedAnswers[index] === option
																			}
																			onChange={() =>
																				handleAnswerSelect(index, option)
																			}
																		/>
																		{option}
																	</label>
																))}
															</div>
															{selectedAnswers[index] && (
																<div
																	className={`mt-4 text-lg font-medium ${
																		isAnswerCorrect[index]
																			? 'text-green-600'
																			: 'text-red-600'
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
															playVideoFromTimestamp(
																'YOUR_VIDEO_ID',
																savedTimestamp
															)
														}
														className='text-sm text-blue-500 underline'
													>
														Play video from: {formatTime(savedTimestamp)}
													</button>
												</div>
											)}
										</div>
									</SheetDescription>
								</SheetHeader>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</div>
	);
}
