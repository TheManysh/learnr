'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getCourseById } from '@/app/services/api_services';
import Link from 'next/link';

const CourseDetail = ({ params }) => {
	const router = useRouter();
	const { courseid } = useParams();
	const [course, setCourse] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCourse = async () => {
			try {
				const courseData = await getCourseById(courseid);
				setCourse(courseData);
			} catch (error) {
				setError(error.message);
				router.push('/dashboard/courses');
			}
		};

		fetchCourse();
	}, [courseid, router]);

	if (error) {
		return <p>Error: {error}</p>;
	}

	if (!course) {
		return <p>Loading...</p>;
	}

	return (
		<div className='flex flex-col items-center space-y-5'>
			<h1 className='text-2xl font-semibold text-blue-500'>{course.title}</h1>
			<div className='w-[400px] h-[400px]'>
				<Image
					src={course.image_url}
					alt={course.title}
					className='object-cover w-full h-full rounded-lg'
					width={400}
					height={400}
				/>
			</div>
			<p className='text-lg'>Created by: {course.created_by.name}</p>

			{/* show the list of the lesson  */}
			<div>
				<h2 className='mb-4 text-xl font-semibold text-blue-500'>Lessons</h2>
				<ul className='flex flex-col gap-4'>
					{course.video_id.map((lesson) => (
						<Link href={`/dashboard/courses/${course._id}/${lesson._id}`}>
							<li
								className='w-full p-8 bg-white border border-gray-300 rounded-lg shadow-md cursor-pointer'
								key={lesson._id}
							>
								<p className='text-lg font-semibold'>{lesson.title}</p>
								<p className='text-sm'>{lesson.original_author}</p>
							</li>
						</Link>
					))}
				</ul>
			</div>

			<button
				className='px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-800'
				onClick={() => router.push('/dashboard/courses')}
			>
				Go Back to Courses
			</button>
		</div>
	);
};

export default CourseDetail;
