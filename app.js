import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
const logger = require('morgan');   // old way of importing due to 'deprecated' issue

// routers
import indexRouter from './routes/index';
import movieRouter from './routes/movie';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// settings
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    expressSession({
        secret: 'piis',
        resave: false,
        saveUninitialized: true
    })
);

// static files
// app.use(express.static(path.join(__dirname, ''))); // use only for local dev server

// routes
app.use('/', indexRouter);
app.use('/movie', movieRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app;
