# U
- U

# Steps
1. Copy rerepository to your local file
```
git clone https://github.com/xiaochendev/gRepo.git
```
2. Change to direcotry
```
cd gRepo
```

3. Create .env in mongodb_app dir
```
touch .env
```
4. Add variables in .env
```
MONGO_URI=<YOUR_MONGODB_COLLECTION_CONNECTION>
PORT=3000
```

5. Install all the required dependencies
```
npm install
```

6. Start the server
```
npm start
```

7. Add Seed-data into your mongodb First by visiting broswer
```
localhost:3000/seed
```
- notes: Your supposed to see 'All animal data seeded successfully' if Your set MONGO_URI corretly in .env

8. Then, Its viewable in your browser by entering
```
localhost:3000
```

Notes: Install Extensions (Thunder Client or Postman) in Visual Studio allow you to test following APIs.

# API Reference
|  VERB |   PATH | QUERY PARAMS | DESCRIPTION |
|----------|----------|--------|------------------------------|
| Pages |   |   |   |
|  GET  | / |  - |  Render home page|


# Technologies
- react.js
- Node.js
- Express.js
- mongoose

# Reflections
- What could you have done differently during the planning stages of your project to make the execution easier?
  
  D