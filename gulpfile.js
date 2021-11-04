const { series,parallel,src,dest, gulp, watch } = require('gulp');
const sass = require('gulp-sass') (require('sass'))//funcion que compila sass
const imagemin= require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');
//utilidades css
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
//utilidades js
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');

//functions
const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
} 
function css(){
     return src(paths.scss)
     .pipe( sourcemaps.init() )
     .pipe(sass().on('error', sass.logError))
     .pipe( sass())
     .pipe( postcss([autoprefixer(), cssnano() ]))
     .pipe(sourcemaps.write('.'))
     .pipe( dest('./build/css')) 
 }
function js(){
    return src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe( terser())
    .pipe(sourcemaps.write('.'))
    .pipe( rename({ suffix: '.min'}))
    .pipe( dest('./build/js'))
}

 function imagenes(){
     return src(paths.imagenes)
     .pipe( imagemin() )
     .pipe( dest( './build/img'))
     .pipe( notify({message: 'Imagen Modificada'}));
 }
 function versionWebp(){
    return src(paths.imagenes)
    .pipe( webp() )
    .pipe( dest( './build/img'))
    .pipe( notify({message: 'Version Webp Lista'}));
 }
function watchArchivos(){
    watch (paths.scss, css);//* = la carpera actual - ** = todos los archivos con esa extension
    watch (paths.js, js);
}

 exports.css = css;
 exports.watchArchivos = watchArchivos;
 exports.imagenes = imagenes;
 exports.default = series( css,js, imagenes,versionWebp, watchArchivos);