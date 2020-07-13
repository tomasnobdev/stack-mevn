const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

const uri = 'mongodb://localhost/mevn-database';
mongoose.connect(uri, { 
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false })
.then(db => console.log('DB is connected'))
.catch(err => console.log(err));
// Settings
app.set('port', process.env.PORT || 3000);


// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/tasks', require('./routes/tasks'));


// Static Files
app.use(express.static(__dirname + '/public'));

// Server is listening
app.listen(app.get('port'), () => {
	console.log('Server on port', app.get('port'));
});