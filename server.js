const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('YOUR MONGODB URI',
    { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});
//re-arrange ./routes/items (below)?
const NoticesRouter = require('./routes/Notices');
app.use('/notices', NoticesRouter);

const ProblemsRouter = require('./routes/Problems');
app.use('/problems', ProblemsRouter);

const UserProfilesRouter = require('./routes/UserProfiles');
app.use('/userprofiles', UserProfilesRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});