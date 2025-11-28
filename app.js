require('dotenv').config(); //to get the environment variables
//const cors = require('cors');
const express = require('express');
const app = express();
const userModel = require('./models/post-model')

// app.use(cors({
//   origin:'http://localhost:5173', // or your frontend URL
//   credentials: true
// }));


// ------parsers-------(will be before the routes)
app.use(express.json());   
app.use(express.urlencoded({ extended: true }));

//parsers ke baad ye hoga 
//whenever someone hits any route (/create, /read, etc.), use this router to handle it.”
const postRoutes = require('./routes/postRoutes');
app.use('/', postRoutes);

app.set('view engine', 'ejs'); 
//this is to set the views directory as the default directory for ejs files
app.set('views', './views'); 

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});