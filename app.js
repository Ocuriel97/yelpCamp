var express = require('express')
var app = express()
var request = require('request')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var campground = require ('./models/campground')
var seedDB = require('./seeds')
var Comment = require('./models/comment')

seedDB()

mongoose.connect('mongodb://localhost/yelp_camp')

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + "/public"))

//root page base url
app.get('/', function(req,res){
  res.redirect('campgrounds')
})

//shows all the campgrounds that are currently on the db
app.get('/campgrounds', function(req,res){
  campground.find({}, function(err,allCampgrounds){
    if (err) {
      console.log(err)
    } else {
      res.render('campgrounds/index', {campgrounds: allCampgrounds})
    }
  })
})

//sends the created campground to the db
app.post('/campgrounds', function(req,res){
  var name = req.body.name
  var image = req.body.image
  var desc = req.body.description
  var newCamp = {name: name, image: image, description: desc}
  campground.create(newCamp, function(err, newlyCreated){
    if (err) {
      console.log(err)
    } else {
      res.redirect('/campgrounds')
    }
  })
})

//the page that you create a campground
app.get('/campgrounds/new', function(req,res){
  res.render('campgrounds/new')
})

//Opens the campground page
app.get('/campgrounds/:id', function(req,res){
  campground.findById(req.params.id).populate('comments').exec(function(err, foundCamp){
    if (err) {
      console.log(err)
    } else {
      res.render('campgrounds/show', {campground: foundCamp})
    }
  })
})

//COMMENTS

//COMMENTS
app.get('/campgrounds/:id/comments/new', function(req,res){
  campground.findById(req.params.id, function(err, campground){
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', {campground: campground})
    }
  })
})

app.post('/campgrounds/:id/comments', function(req,res){
  campground.findById(req.params.id, function(err, campground){
    if (err) {
      console.log(err)
      res.redirect('/campgrounds')
    } else {
      Comment.create(req.body.comment, function(err,comment){
        if (err) {
          console.log(err)
        } else {
          campground.comments.push(comment)
          campground.save()
          res.redirect('/campgrounds/'+campground._id)
        }
      })
    }
  })
})

//port that the server is running on
app.listen(3000, function(){
  console.log('App running');
})
