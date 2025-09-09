# UI Admin 
- UI for non-technical admins to CRUD on Posts, Users, Comments
- Some Unknow not solve yet, not enough validations when Create New post/user/comment

# Steps
1. Copy rerepository to your local file
```
git clone https://github.com/xiaochendev/gRepo.git
```

2. Install all the required dependencies
```
npm install
```

3. Start the server
```
npm start
```

4. Its viewable in your browser by entering
```
localhost:3000
```

Notes: Install Extensions (Thunder Client or Postman) in Visual Studio allow you to test following APIs.

# API Reference
|  VERB |   PATH | QUERY PARAMS | DESCRIPTION |
|----------|----------|--------|------------------------------|
| Pages |   |   |   |
|  GET  | / |  - |  Render home page (EJS) |
|  GET  | /about |  - |  Render about page (EJS) |
|  POST  | /submit |  - |  Submit form from home page |
| Users |   |   |   |
|  GET  | /api/users |  - |  Get all users  |
|  POST  | /api/users |  - |  Create a new user  |
|  GET  | /api/users/:id |  - |  Get user by ID |
|  PATCH  | /api/users/:id |  - |  Update user fields by ID |
|  DELETE  | /api/users/:id |  - |  Delete user by ID |
|  GET  | /api/users/:id/posts |  - |  Get all posts created by the user |
|  GET  | /api/users/:id/comments |  postId |  Get all comments by the user; filter by post if postId is provided|
| Posts |   |   |   |
|  GET  | /api/posts |  userId |  Get all posts; filter by userId  |
|  POST  | /api/posts |  - | Create a new post |
|  GET  | /api/posts/:id |  - | Get post by ID |
|  PATCH  | /api/posts/:id |  - | Update post fields by ID |
|  DELETE  | /api/posts/:id |  - | Delete post by ID |
|  GET  | /api/posts/:id/comments |  userId | Get all comments on post; filter by userId if provided |
| Comments |   |   |   |
|  GET  | /api/comments |  userId, postId |  Get all comments; filter by userId, postId, or both  |
|  POST  | /api/comments |  - |  Create a new comment  |
|  GET  | /api/comments/:id |  - |  Get comment by ID  |
|  PATCH  | /api/comments/:id |  - |  Update comment body |
|  DELETE  | /api/comments/:id |  - |  Delete comment by ID |

# Technologies
- express.js
- css
- html

