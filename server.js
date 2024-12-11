const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

//const connectDatabase = require('./config/connection')

//connectDatabase()

//const corsOptions = {
//	origin: '*',
//	optionsSuccessStatus: 200
//};
//app.use(cors({
//    origin: ["http://localhost:8080"],
 //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   credentials: true
//}));

//app.use(cors(corsOptions));
//const errorHandler = require('./middleware/errorHandler')

//const db = require('./config/connection');  needed?
//const dotenv = require("dotenv");

//dotenv.config();
//if (process.env.NODE_ENV !== 'production') {
//	require('dotenv').config();
//}
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8080;
                               // or http://localhost:5173/
                               //   http://localhost:5000/
//app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/public')))
//app.use(errorHandler)

//const apiRouter = require('./routes/api');
//app.use('/api', apiRouter);
app.get("/", (req, res) => {
	res.status(200).json({
		message:'Welcome to CouncilNote'
	});
});

const AuthRouter = require('./routes/Auth');
app.use('/auth', AuthRouter ); 
// or home? or login? or /auth? or for Users? needed?

const UsersRouter = require('./routes/Users');
app.use('/users', UsersRouter);

const NoticesRouter = require('./routes/Notices');
app.use('/notices', NoticesRouter);

const ProblemsRouter = require('./routes/Problems');
app.use('/problems', ProblemsRouter);


//dotenv.config({ path: 'ENV_FILENAME' });
app.use((error, req, res, next) => {
    res.status(500).json({
        msg: "Error occurred in the server",
        error: error.message
    });
});

//needed?
//app.all('*', (req, res) => {
  //  res.status(404)
  //  if (req.accepts('html')) {
  //      res.sendFile(path.join(__dirname, 'views', 'notFound.html'))
  //  } else if (req.accepts('json')) {
  //      res.json({ error: 'Not found' })
  //  } else {
   //     res.type('txt').send('404 Not Found')
  //  }})

// MongoDB connection
//const uri = process.env.MONGO_URI
//mongoose.connect(uri || 'mongodb://127.0.0.1:27017/councilnote' { useNewUrlParser: true, useUnifiedTopology: true })
//.then(() => app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`)))
//.catch((error) => console.log(error.message)) 
//mongoose.set('useFindAndModify', false)


mongoose.connect( process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/councilnote',
   { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once('open', () => {
    console.log('Successfully Connected to MongoDB')
    //app.listen(PORT, () => console.log(`Server running on port ${PORT}`)) //or separate below?
})

db.on('error', err => {
    console.log(err)
})

//connection.once('open', () => {
   // console.log('MongoDB database connection established successfully');
//});


app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

module.exports = {
    app,
    PORT
}