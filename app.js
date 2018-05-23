var app = require('express')()
var request = require('request')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/yelp_camp')

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
})

var campground = mongoose.model('Campground', campgroundSchema)

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

app.get('/', function(req,res){
  res.render('landing')
})

app.get('/campgrounds', function(req,res){
  campground.find({}, function(err,allCampgrounds){
    if (err) {
      console.log(err)
    } else {
      res.render('index', {campgrounds: allCampgrounds})
    }
  })
  //res.render('campgrounds', {campgrounds: campgrounds})
})

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

app.get('/campgrounds/new', function(req,res){
  res.render('new')
})

app.get('/campgrounds/:id', function(req,res){
  campground.findById(req.params.id, function(err, foundCamp){
    if (err) {
      console.log(err)
    } else {
      res.render('show', {campground: foundCamp})
    }
  })
})

app.listen(3000, function(){
  console.log('App running');
})
