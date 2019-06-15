const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const auth = require('./routes/api/auth');
const posts = require('./routes/api/posts');
const reviews = require('./routes/api/reviews');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;


// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World!'));

// Use Routes
app.use('/api/auth', auth);
app.use('/api/posts', posts);
app.use('/api/reviews', reviews);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));