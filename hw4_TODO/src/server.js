const express = require('express');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const Sentry = require('@sentry/node');

const swaggerSpec = require('../swagerSpec');
const userRouter = require('./routes/user/user');
const todoRouter = require('./routes/todo/todo');
const apiErrorMiddleware = require('./middlewares/apiErrorMiddleware');

require('./utils/loggers/initSentryConfig');

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'production') {
	Sentry.setupExpressErrorHandler(app);
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/users', userRouter);
app.use('/api/todos', todoRouter);
app.use(apiErrorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log('Server is running on port', PORT);
});
