const express = require('express');
const bodyParser = require('body-parser');
const posts = require('./routes/posts');
const comments = require('./routes/comments');
const validate = require('./routes/validate');

let app = express();
app.use(bodyParser.json());

app.get('/posts', posts.get);
app.post('/posts', [validate.posts, posts.add]);
app.put('/posts/:id', [validate.posts,posts.update]);
app.delete('/posts/:id', posts.remove);
app.get('/posts/:postId/comments', comments.get);
app.post('/posts/:postId/comments', [validate.comments,comments.add]);
app.put('/posts/:postId/comments/:commentId', [validate.comments,comments.update]);
app.delete('/posts/:postId/comments/:commentId', comments.remove);
console.log('Listening at port 3000.');
app.listen(3000);