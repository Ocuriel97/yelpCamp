var app = require('express')()
var request = require('request')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var campground = require ('./models/campground')

mongoose.connect('mongodb://localhost/yelp_camp')

//creates a new campground manually
// campground.create(
//   {
//     name: 'flats',
//     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/1991-1996_BMW_318i_%28E36%29_sedan_%282011-04-02%29_01.jpg/1200px-1991-1996_BMW_318i_%28E36%29_sedan_%282011-04-02%29_01.jpg',
//     description: "this flat is dope af"
//   }, function(err, campground){
//     if(err){
//       console.log(err)
//     } else {
//       console.log('new campground')
//       console.log(campground)
//     }
//   }
// )

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

//root page base url
app.get('/', function(req,res){
  res.render('landing')
})

//shows all the campgrounds that are currently on the db
app.get('/campgrounds', function(req,res){
  campground.find({}, function(err,allCampgrounds){
    if (err) {
      console.log(err)
    } else {
      res.render('index', {campgrounds: allCampgrounds})
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
  res.render('new')
})

//Opens the campground page
app.get('/campgrounds/:id', function(req,res){
  campground.findById(req.params.id, function(err, foundCamp){
    if (err) {
      console.log(err)
    } else {
      res.render('show', {campground: foundCamp})
    }
  })
})

//port that the server is running on
app.listen(3000, function(){
  console.log('App running');
})
