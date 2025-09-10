import express from 'express';
import { users } from "../data/users.mjs";
import { posts } from "../data/posts.mjs";
import { comments } from '../data/comments.mjs';

const router = express.Router();

// router
//     .route('/:username')
//     .get((req, res) => {
//         const { username } = req.params;
//         res.send(`Hello, ${username}! Its your profiles`);
//     })

// @route   GET /api/users
// @desc    Retrieve all users
// @access  Public
router
  .route("/")
  .get((req, res) => {
    // res.json(users);
      res.render("users", { users }); 
  })

  // @route   POST /api/users
  // @desc    Create a new user
  // @access  Public
  .post((req, res) => {
    const { name, username, email } = req.body;

    // Check if we have all data needed to create user
    if (name && username && email) {
      // check is username exists!!
      if (users.find((u) => u.username == username)) {
        res.status(400).json({ err: "Username taken" });
        return;
      }

      const user = {
        id: users[users.length - 1].id + 1, //find the last users id number and add one to it.
        name,
        username,
        email,
      };
      users.push(user);
      // res.json(user);
      req.flash('success', 'User created successfully');
      res.redirect('/api/users')
    } else res.status(400).json({ msg: "Insuffecient Data" });
  });

// @route   GET /api/users/:id
// @desc    Get a single user by ID
// @access  Public
router
  .route("/:id")
  .get((req, res, next) => {
      const id = req.params.id;
      const user = users.find((user) => user.id == req.params.id);
      const userPosts = posts.filter(p => p.userId == id);
      const userComments = comments.filter(c => c.userId == id);

      if (user) {
        // res.json(user);
        res.render("user", { user, userPosts, userComments}); 
      } else next();  // Triggers 404
  })

  // @route   PATCH /api/users/:id
  // @desc    Update a user by ID
  // @access  Public
  .patch((req, res, next) => {
    // find the user that the client wants to change
    const id = req.params.id;
    const data = req.body;

    const user = users.find((user, i) => {
        if (user.id == id) {
            for (const item in data) {
              users[i][item] = data[item]; // make the changes
          }
            return true;
        }
    });

    // send a response back to the client
    if (user) {
        // res.json(users);
        req.flash('success', 'User updated successfully');
        res.redirect(`/api/users/${user.id}`);
    } else next();
  })

  // @route   DELETE /api/users/:id
  // @desc    Delete a user by ID
  // @access  Public
  .delete((req, res, next) => {
    // find user the client wants to delete
    const id = req.params.id;
    const user = users.find((user, i) => {
      if (user.id == id) {
          users.splice(i, 1); // remove the user at index i
          return true;
      }
    });

    // send a response back to the client
    if (user) {
        // res.json(users);
        req.flash('success', 'User deleted successfully');
        res.redirect(`/api/users`);
    } else next();
  });

// @router GET /api/users/:id/posts
// @desc Retrieve all posts created by a specific user (by userId)
// @access public
router
    .route("/:id/posts")
    .get((req, res, next) => {
        const { id } = req.params;
        const userPosts = posts.filter((post) => post.userId == id);

        // validate user
        const user = users.find(u => u.id == id);
        if (!user) {
            req.flash('info', 'User not found.'); 
            return res.redirect('/api/users');
        }
        
        if (userPosts.length > 0) {
            const user = users.find(u => u.id == id);
            // res.json(userPosts);
            req.flash('success', 'Posts retrieved successfully');
            res.render('user-posts', { title: 'User Posts', user, posts: userPosts });
        } else {
            // next(); // No posts found — let global 404 handler handle it
            req.flash('info', 'This user has no posts yet.');
            res.render('user-posts', { title: 'User Posts', user, posts: [] });
        }
    })

// @router GET /api/users/:id/comments
// @desc Retrieve all comments made by a specific user
// @access Public
router
    .route("/:id/comments")
    .get((req, res, next) => {
        const { id } = req.params;
        const { postId } = req.query;

        const user = users.find(u => u.id == id); 
        const post = postId ? posts.find(p => p.id == postId) : null;  

        // validate user exist
        if (!user) {
            req.flash('error', 'User not found');
            return res.redirect('/api/users');
        }

        let userComments = comments.filter((comment) => comment.userId == id);
        
        // GET /users/:id/comments?postId=<VALUE>
          // Retrieves comments made by the user with the specified id on the post with the specified postId.

        if (postId) {
            userComments = userComments.filter((comment) => comment.postId == postId);
        }
        
        // if (userComments.length > 0) {
        //     res.json(userComments);
        // } else {
        //     next(); // No comments found
        // }

        if (userComments.length > 0) {
            const user = users.find(u => u.id == id);
            const post = posts.find(p => p.id == postId);

            res.render('user-comments', { 
              title: 'User Comments', 
              user, 
              post, 
              userComments 
            });
        } else {
            // next();
            req.flash('info', 'This user has no coments yet.');
            res.render('user-comments', { title: 'User Comments', user, post, userComments });
        }
    })

export default router;