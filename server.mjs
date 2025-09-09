// import
import express from 'express';
import ejs from 'ejs';
import session from 'express-session';
import flash from 'connect-flash';
import homeRoutes from './routes/homeRoutes.mjs';
import aboutRoutes from './routes/aboutRoutes.mjs';
import userRoutes from './routes/userRoutes.mjs';
import postRoutes from './routes/postRoutes.mjs';
import commentRoutes from './routes/commentRoutes.mjs';
import methodOverride from 'method-override';
import { error } from './utilities/error.mjs';
import { validateJsonMiddleware } from './utilities/validateJson.mjs'


// set up
const app = express();
const port = 3000;

app.set('views', './views');        //specifiy directory
app.set('view engine', 'ejs');     // register ejs engine 

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));         // Enable PATCH/DELETE via HTML Forms, use ?method=PATCH or ?method=DELETE.
// Setup sessions
app.use(session({
  secret: 'mySecret123',     // can use env variables
  resave: false,
  saveUninitialized: true
}));

// Setup flash messages
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// cutomized middlewares #1 
app.use((req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`[Custome Log]: ${time}: ${req.method} request to ${req.url}`);
  next();
});

// customized middlewares #2
app.use(validateJsonMiddleware);

// static style
app.use(express.static('./styles'));

// routes
app.use(homeRoutes);
app.use('/about', aboutRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Global Err Handling
app.use((req, res) => {
  next(error(404, "Resource Not Found"));
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ msg: `❌ Error - ${err.message}` });
});

// listener
app.listen(port, () => {
    console.log(`Server running in port: ${port}`);
})