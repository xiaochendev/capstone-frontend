import express from 'express';
import { comments } from '../data/comments.mjs';
import { users } from "../data/users.mjs";
import { posts } from "../data/posts.mjs";


const router = express.Router();

// @router GET /api/comments
// @desc Retrieve all comments, optionally filtered by userId and/or postId
// @query userId=<number> (optional), postId=<number> (optional)
// @access public
router
    .route('/')
    .get((req, res) => {
        // res.json(comments);
        const { userId, postId } = req.query;

        let filteredComments = comments;

        if (userId) {
            filteredComments = filteredComments.filter(
            (comment) => comment.userId == userId
            );
        }

        if (postId) {
            filteredComments = filteredComments.filter(
            (comment) => comment.postId == postId
            );
        }

        // res.json(filteredComments);
        res.render('comments', {title: 'comments', comments: filteredComments});
    })

    // @route   POST /api/comments
    // @desc    Create a new comment
    // @body    userId=<number>, postId=<number>, body=<string>
    // @access  Public
    .post((req, res) => {
        const { userId, postId, body } = req.body;

        if (!userId || !postId || !body) {
            return res.status(400).json({ error: 'Missing required fields' });
            // req.flash('error', 'All fields are required');
            // return res.redirect('/api/comments'); 
        }
        
        // validate user exist
        const userExists = users.some(user => user.id === Number(userId));
        if (!userExists) {
            req.flash('error', `Failed to comment!! User ID ${userId} does not exist`);
            return res.redirect('/api/comments');
        }

        // validate post exist
        const postExist = posts.some(post => post.id === Number(postId));
        if (!postExist) {
            req.flash('error', `Failed to comment!! Post ID ${postId} does not exist`);
            return res.redirect('/api/comments');
        }

        // Create new comment
        const newComment = {
            id: comments.length > 0 
                    ? comments[comments.length - 1].id + 1 
                    : 1,
            userId: Number(userId),
            postId: Number(postId),
            body,
        };

        comments.push(newComment);
        // res.status(201).json(newComment);
        req.flash('success', 'Comment created successfully');
        res.redirect(`/api/comments`);
        // res.redirect(`/api/posts/${postId}`);
    })

// @router GET api/comments/:id
// @desc Retrieve a single comment by its ID
// @param   id - the ID of the comment to retrieve
// @access  public
router
    .route("/:id")
    .get((req, res, next) => {
        const { id } = req.params;
        const comment = comments.find((c) => c.id == id);

        if (comment) {
            // res.json(comment);
            res.render('comment', {title: 'comment', comment});
        } else {
            next(); // Triggers global 404 handler
        }
    })

    // @route   PATCH /api/comments/:id
    // @desc    Update the body of a comment by its ID
    // @param   id - the ID of the comment to update
    // @body    body=<string> (required)
    // @access  Public
    .patch((req, res, next) => {
        const { id } = req.params;
        const { body } = req.body;

        const comment = comments.find((c) => c.id == id);

        if (!comment) return next();

        if (body) {
            comment.body = body;
            // res.json(comment);
            req.flash('success', 'Comment updated successfully');
            // res.render('comment', {title: 'comment', comment});
            res.redirect(`/api/comments/${id}`);
        } else {
            res.status(400).json({ error: 'No update provided' });
        }
    })

    // @route   DELETE /api/comments/:id
    // @desc    Delete a comment by its ID
    // @param   id - the ID of the comment to delete
    // @access  Public
    .delete((req, res, next) => {
        const { id } = req.params;
        const index = comments.findIndex((c) => c.id == id);

        if (index !== -1) {
            const deleted = comments.splice(index, 1);
            // res.json({ msg: 'Comment deleted', deleted });
            // res.render('comment', {title: 'comment deleted', comment: deleted[0]});
            req.flash('success', 'Comment deleted successfully');
            res.redirect('/api/comments');
        } else {
            next(); // Comment not found
        }
    })

export default router;