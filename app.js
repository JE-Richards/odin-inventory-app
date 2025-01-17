require('dotenv').config();
const express = require('express');
const path = require('node:path');
const indexRouter = require('./routes/indexRouter');
const booksRouter = require('./routes/booksRouter');
const authorRouter = require('./routes/authorsRouter');
const genresRouter = require('./routes/genresRouter');
const publishersRouter = require('./routes/publishersRouter');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/publishers', publishersRouter());
app.use('/genres', genresRouter());
app.use('/books', booksRouter());
app.use('/authors', authorRouter());
app.use('/', indexRouter());
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.statusCode || 500)
    .render('error', { title: 'Error', error: err.message });
});

app.listen(process.env.PORT, () => {
  console.log(
    `Express app - listening on ${process.env.HOST}:${process.env.PORT}`
  );
});
