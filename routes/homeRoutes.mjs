import express from 'express';
import { users } from '../data/users.mjs';
import { posts } from '../data/posts.mjs';

const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        res.render('home', { title: 'Home', users, posts } );
    })
    
// post routes for submit form in home page
router
    .route('/submit')
    .post((req, res) => {
    console.log('form submitted:', req.body);
    // res.send('success!!! data received');
    req.flash('success', 'Sent successfully');
    res.redirect('/');
})

export default router;  