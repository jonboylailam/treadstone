var gulp = require('gulp'),
    server = require('gulp-develop-server'),
    livereload = require('gulp-livereload'),
    source = require('vinyl-source-stream'), // Used to stream bundle for further handling
    browserify = require('browserify'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    streamify = require('gulp-streamify'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    gutil = require('gulp-util'),
    shell = require('gulp-shell'),
    glob = require('glob'),
    Rx = require('rx');

var filesToWatch = [
    './server/**/*',
    './client/build/**/*'
];

var startServer = function (options) {
    server.listen(options, livereload.listen);

    if (options.development) {
        function restart(file) {
            server.changed(function (error) {
                if (!error) livereload.changed(file.path);
            });
        }

        gulp.watch(filesToWatch).on('change', restart);
    }
};

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var dependencies = [
    'react',
    'moment'
];

var browserifyTask = function (options) {

    // Our app bundler
    var appBundler = browserify({
        entries: [options.src], // Only need initial file, browserify finds the rest
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: options.development, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: options.development // Requirement of watchify
    });

    // We set our dependencies as externals on our app bundler when developing
    (options.development ? dependencies : []).forEach(function (dep) {
        appBundler.external(dep);
    });

    // The rebundle process
    var rebundle = function () {
        var start = Date.now();
        console.log('Building APP bundle');
        appBundler.bundle()
            .on('error', gutil.log)
            .pipe(source('main.js'))
            .pipe(gulpif(!options.development, streamify(uglify())))
            .pipe(gulp.dest(options.dest))
            .pipe(notify(function () {
                console.log('APP bundle built in ' + (Date.now() - start) + 'ms');
            }));
    };

    // Fire up Watchify when developing
    if (options.development) {
        appBundler = watchify(appBundler);
        appBundler.on('update', rebundle);
    }

    rebundle();

    // We create a separate bundle for our dependencies as they
    // should not rebundle on file changes. This only happens when
    // we develop. When deploying the dependencies will be included
    // in the application bundle
    if (options.development) {
        var vendorsBundler = browserify({
            debug: true,
            require: dependencies
        });

        // Run the vendor bundle
        var start = new Date();
        console.log('Building VENDORS bundle');
        vendorsBundler.bundle()
            .on('error', gutil.log)
            .pipe(source('vendors.js'))
            .pipe(gulpif(!options.development, streamify(uglify())))
            .pipe(gulp.dest(options.dest))
            .pipe(notify(function () {
                console.log('VENDORS bundle built in ' + (Date.now() - start) + 'ms');
            }));
    }
};

var cssTask = function (options) {
    if (options.development) {
        var run = function () {
            console.log(arguments);
            var start = new Date();
            console.log('Building CSS bundle');
            gulp.src(options.src)
                .pipe(concat('main.css'))
                .pipe(gulp.dest(options.dest))
                .pipe(notify(function () {
                    console.log('CSS bundle built in ' + (Date.now() - start) + 'ms');
                }));
        };
        run();
        gulp.watch(options.src, run);
    } else {
        gulp.src(options.src)
            .pipe(concat('main.css'))
            .pipe(cssmin())
            .pipe(gulp.dest(options.dest));
    }
};

var copyStaticFiles = function (options) {
    gulp.src([options.src])
        .pipe(gulp.dest(options.dest))
};

gulp.task('client:init', function (cb) {
    browserifyTask({
        development: true,
        src: './client/app/main.js',
        dest: './client/build'
    });

    cssTask({
        development: true,
        src: './client/styles/**/*.css',
        dest: './client/build'
    });

    cb(null);
});

gulp.task('server:init', function () {
    startServer({
        development: true,
        path: "./server/server.js"
    });
});

// Starts our development workflow
gulp.task('default', ['client:init'], function () {

    Rx.Observable.timer(4500).subscribe(function () {
        startServer({
            development: true,
            path: "./server/server.js"
        });
    });
});

gulp.task('deploy', function () {

    browserifyTask({
        development: false,
        src: './client/app/main.js',
        dest: './client/dist'
    });

    cssTask({
        development: false,
        src: './client/styles/**/*.css',
        dest: './client/dist'
    });


    gulp.src(['./client/build/img/**/*']).pipe(gulp.dest('./client/dist/img'));
    gulp.src(['./client/build/js/**/*']).pipe(gulp.dest('./client/dist/js'));

    startServer({
        development: false,
        path: "./server/server.js"
    });
});

gulp.task('test', function () {
    return gulp.src('./client/build/testrunner-phantomjs.html').pipe(jasminePhantomJs());
});
