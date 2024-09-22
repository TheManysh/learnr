export const loginUser = async (email, password) => {
	try {
		const response = await fetch(
			'http://localhost:3000/hackademia/user/auth/login',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			}
		);

		if (response.status != 200) {
			const data = await response.json();

			throw new Error(data.message || 'Failed to log in');
		}

		const data = await response.json();
		localStorage.setItem('authToken', data.data.token);
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const signUpUser = async (name, email, password) => {
	try {
		const response = await fetch(
			'http://localhost:3000/hackademia/user/auth/signup',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name, email, password }),
			}
		);

		if (response.status != 200) {
			const data = await response.json();
			throw new Error(data.message || 'Failed to Signup');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getCourses = async () => {
	try {
		const authToken = localStorage.getItem('authToken');

		if (!authToken) {
			throw new Error('Unauthorized');
		}

		const response = await fetch(
			'http://localhost:3000/hackademia/course/get/',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${authToken}`,
				},
			}
		);

		if (response.status != 200) {
			const data = await response.json();
			throw new Error(data.message || 'Failed to get Courses');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const createCourse = async (url) => {
	try {
		const authToken = localStorage.getItem('authToken');
		const response = await fetch(
			'http://localhost:3000/hackademia/course/crud/',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${authToken}`,
				},
				body: JSON.stringify({ url }),
			}
		);

		if (response.status !== 201) {
			const data = await response.json();
			throw new Error(data.message || 'Failed to create course');
		}

		const data = await response.json();

		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getCourseById = async (id) => {
	try {
		const authToken = localStorage.getItem('authToken');
		console.log(authToken);
		const response = await fetch(
			`http://localhost:3000/hackademia/course/get/${id}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${authToken}`,
				},
			}
		);

		if (!response.ok) {
			const data = await response.json();
			throw new Error(data.message || 'Failed to fetch course');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
export const getVideoById = async (id) => {
	try {
		const authToken = localStorage.getItem('authToken');
		console.log(authToken);
		const response = await fetch(
			`http://localhost:3000/hackademia/video/get/${id}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${authToken}`,
				},
			}
		);

		if (!response.ok) {
			const data = await response.json();
			throw new Error(data.message || 'Failed to fetch course');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const createQuiz = async (video_id) => {
	try {
		const authToken = localStorage.getItem('authToken');
		const response = await fetch(
			'http://localhost:3000/hackademia/quiz/crud/',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${authToken}`,
				},
				body: JSON.stringify({ video_id }),
			}
		);

		if (response.status !== 201) {
			const data = await response.json();
			throw new Error(data.message || 'Failed to create course');
		}

		const data = await response.json();

		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getQuizByVideoId = async (id) => {
	try {
		const authToken = localStorage.getItem('authToken');
		console.log(authToken);
		const response = await fetch(
			`http://localhost:3000/hackademia/quiz/get/${id}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${authToken}`,
				},
			}
		);

		if (!response.ok) {
			const data = await response.json();
			throw new Error(data.message || 'Failed to fetch course');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
