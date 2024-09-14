const express = require('express');
const userRouter = require('./routes/user');
const todoRouter = require('./routes/todo');
const apiErrorMiddleware = require('./middlewares/apiErrorMiddleware');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/todos', todoRouter);
app.use(apiErrorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log('Server is running on port', PORT);
});
