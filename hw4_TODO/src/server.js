const express = require('express');
const swaggerUi = require('swagger-ui-express');
const Sentry = require('@sentry/node');

const swaggerSpec = require('../swagerSpec');
const userRouter = require('./routes/user/user');
const todoRouter = require('./routes/todo/todo');
const apiErrorMiddleware = require('./middlewares/apiErrorMiddleware');
const initSentry = require('../instrument');

require('dotenv').config();
initSentry(process.env.SENTRY_DSN);

const app = express();

app.use(express.json());

Sentry.setupExpressErrorHandler(app);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/users', userRouter);
app.use('/api/todos', todoRouter);
app.use(apiErrorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log('Server is running on port', PORT);
});
