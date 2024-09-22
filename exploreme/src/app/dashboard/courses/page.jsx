'use client';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getCourses } from '@/app/services/api_services';

const Courses = () => {
	const router = useRouter();
	const [courses, setCourses] = useState([]);
	console.log(courses);
	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const response = await getCourses();
				setCourses(response);
			} catch (error) {
				console.error('Error fetching courses:', error);
			}
		};

		fetchCourses();
	}, []);

	return (
		<div className='flex flex-col space-y-5'>
			<h1 className='text-lg font-semibold text-blue-600'>Courses</h1>
			<div className='flex items-center w-full p-2 space-x-2 bg-gray-100 rounded-lg'>
				<Input
					type='text'
					placeholder='search for topic ...'
					className='flex-1 text-gray-700 placeholder-gray-500 bg-transparent border border-gray-500 shadow-md outline-none focus-visible:ring-0'
				/>
				<Button className='bg-blue-500 hover:bg-blue-800'>
					<Search className='w-5 h-5 text-white' />
				</Button>
				<Button
					className='flex items-center gap-3 bg-blue-500 hover:bg-blue-800'
					onClick={() => router.push('/dashboard/create')}
				>
					Create course <PlusCircle />
				</Button>
			</div>
			<div className='flex flex-wrap gap-5'>
				{courses.map((item) => (
					<div
						key={item._id}
						className='flex flex-col items-center p-5 space-y-2 bg-slate-200 rounded-2xl'
					>
						<div className='w-[300px] h-[300px]'>
							<Image
								src={item.image_url}
								alt='courseimg'
								className='object-cover w-full h-full rounded-2xl'
								width={300}
								height={300}
							/>
						</div>
						<div>
							<h1 className='text-base font-semibold'>{item.title}</h1>
						</div>
						<div>
							<p>{item.created_by.name}</p>
						</div>
						<div>
							<Button
								className='flex items-center gap-3 bg-blue-500 hover:bg-blue-800'
								onClick={() => {
									router.push(`/dashboard/courses/${item._id}`);
								}}
							>
								Enroll now
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Courses;
