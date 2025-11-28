require('dotenv').config(); //to get the environment variables
//const cors = require('cors');
const express = require('express');
const app = express();
const userModel = require('./models/post-model')
const cors = require("cors");

app.use(cors({
  origin: "https://lousy-writers-93p2-6ulhz0pxu-shauryas-projects-05599922.vercel.app",
  credentials: true
}));
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));