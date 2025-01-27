const request = require('supertest');
const app = require('../../server');
const TokenHelper = require('../../helpers/tokenHelper');

const fs = require('fs');

/* jest.mock('fs', () => ({
	writeFile: jest.fn((path, data, callback) => {
		callback(null); // Simulate successful write
	}),
	readFile: jest.fn((path, options, callback) => {
		// Simulate reading from a JSON file
		const fakeData = JSON.stringify([{ key: 'value' }]); // Replace with desired mock data
		callback(null, fakeData); // Simulate successful read
	}),
})); */

//const fs = jest.createMockFromModule('fs');

// Mock writeFileSync to avoid writing to the actual JSON file
//jest.mock('fs');
//jest.spyOn(fs, 'writeFile').mockImplementation(() => Promise.resolve());
//jest.spyOn(fs, 'readFile').mockImplementation(() => Promise.resolve());

describe('POST /todos', () => {
	let token;
	const userData = { id: '586586', name: '123456' };
	const todoData = {
		title: 'New todo',
		isCompleted: false,
	};

	beforeAll(() => {
		// Generate a valid token
		const { accessToken } = TokenHelper.generateTokens(userData);
		token = accessToken;
	});

	test('It responds with the newly created todo', async () => {
		const response = await request(app).post('/api/todos').set('Authorization', `Bearer ${token}`).send(todoData);

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty('id');
		expect(response.body.title).toEqual(todoData.title);
		expect(response.body.userId).toEqual(userData.id);
	});

	test('It responds with a 401 error if no token is provided', async () => {
		const response = await request(app).post('/api/todos').set('Authorization', null).send(todoData);

		expect(response.status).toBe(400);
		expect(response.body.errors[0].msg).toEqual('Unauthorized');
	});
});
