import express from "express";
import { posts } from "../data/posts.mjs";
import { comments } from "../data/comments.mjs";
import { users } from "../data/users.mjs";
const router = express.Router();

// @route GET /api/posts
// @desc Get all posts
// @access Public
router
  .route("/")
  .get((req, res) => {
      const postsWithComments = posts.map(post => {
      const postComments = comments.filter(c => c.postId == post.id);
      return { ...post, comments: postComments };
    });
    // res.json(posts);
    res.render('posts', {
      title: 'posts', 
      posts: postsWithComments, 
      users})
  })

  // @route   POST /api/posts
  // @desc    Create a new post
  // @body    userId=<number>, title=<string>, content=<string>
  // @access  Public
  .post((req, res) => {
    const { userId, title, content } = req.body; // grabbing data the client entered through req.body
    let id = posts[posts.length - 1].id + 1; // creating a new id
    // let id = posts.length++;

    // creating a new object that will be pushed to the posts array
    if (userId && title && content) {
      const post = {
        // id: id,
        id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
        // userId: userId,
        userId: Number(userId),
        title: title,
        content: content,
      };
      posts.push(post);
      // res.json(posts[posts.length - 1]);
      req.flash('success', 'Post created successfully');
      res.redirect(`/api/posts`);
    } else {
      res.json({ error: "Insufficient Data" });
    }
  });

// @route   GET /api/posts/:id
// @desc    Get a single post by its ID
// @access  Public
// @route   PATCH /api/posts/:id
// @desc    Update a post by its ID
// @access  Public
// @route   DELETE /api/posts/:id
// @desc    Delete a post by its ID
// @access  Public
router
  .route("/:id")
  .get((req, res, next) => {
    const post = posts.find((post) => post.id == req.params.id);

    // if (post) {
    //   // res.json(post);
    //   res.render('post', {title: 'post', post});
    // } else next();
    if (!post) return next();

    const author = users.find(u => u.id == post.userId);
    const postComments = comments.filter(c => c.postId == post.id);

    res.render('post', { 
      title: 'Post', 
      post, 
      author, 
      postComments, 
      users });
  })
  .patch((req, res, next) => {
    // find the item that the client wants to update
    const id = req.params.id;
    const data = req.body;
    const post = posts.find((post, i) => {
      if (post.id == id) {
        for (const item in data) {
          // in the posts array grab the post that the client wants to change
          posts[i][item] = data[item]; // make the change
        }
        return true;
      }
    });

    // send a response
    if (post) {
      // res.json(posts);
      req.flash('success', 'Post updated successfully');
      res.redirect(`/api/posts/${id}`);
    } else next();
  })

  .delete((req, res, next) => {
    // find the post that the client want to delete
    const id = req.params.id;
    const post = posts.find((post, i) => {
      if (post.id == id) {
        posts.splice(i, 1); // remove the post at index i
        return true;
      }
    });

    // send the client a response
    if (post) {
      // res.json(posts);
      req.flash('success', 'Post deleted successfully');
      res.redirect(`/api/posts`);
    } else next();
  });

// @route   GET /api/posts/:id/comments
// @desc    Retrieve all comments made on a specific post
// @query   userId (optional) - Filters comments to only those made by the specified user
// @param   id - ID of the post to retrieve comments for
// @access  Public
router
  .route('/:id/comments')
  .get((req, res, next ) => {
      const { id } = req.params;
      const { userId } = req.query;

      let postComments = comments.filter((comment) => comment.postId == id);

      // Filter by userId if provided
      if (userId) {
          postComments = postComments.filter((comment) => comment.userId == userId);
      }
    
      if (postComments.length > 0) {
          // res.json(postComments);
          req.flash('success', 'Comment posted successfully');
          res.render('comments', {
              title: `Comments for Post ${id}`,
              comments: postComments
          });
      } else {
          next(); // Triggers global 404 if no comments found
      }
  })

export default router;