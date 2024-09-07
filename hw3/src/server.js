const express = require('express');
const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/user');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
