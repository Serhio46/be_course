const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagerSpec');

const userRouter = require('./routes/user/user');
const todoRouter = require('./routes/todo/todo');
const apiErrorMiddleware = require('./middlewares/apiErrorMiddleware');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/users', userRouter);
app.use('/api/todos', todoRouter);
app.use(apiErrorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log('Server is running on port', PORT);
});
