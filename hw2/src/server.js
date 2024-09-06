const express = require('express');
const router = require('./routes/user');
const loggerMiddleware = require('./middlewares/logger');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(loggerMiddleware);
app.use('/api/users', router);

app.get('/api/hello', (req, res) => {
	res.send('Hello World!');
});

app.get('api/echo', (req, res) => {
	const { message } = req.body;
	res.send(message);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
