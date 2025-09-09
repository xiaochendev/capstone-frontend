import express from 'express';
const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        res.render('about', {title: 'about'});
    })

export default router;