var app = require('express')()
var request = require('request')
var bodyParser = require('body-parser')

var campgrounds = [
  {name: 'flats', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/1991-1996_BMW_318i_%28E36%29_sedan_%282011-04-02%29_01.jpg/1200px-1991-1996_BMW_318i_%28E36%29_sedan_%282011-04-02%29_01.jpg'},
  {name: 'hospital flats', image: 'https://cdn.shopify.com/s/files/1/1063/6350/products/e36_frontside_profile_1024x1024.jpg?v=1502860554'},
  {name: 'Crazy Horse', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM5WAxA9_0BXRmrwTwrL-HVhJVCBDtEgol1Ckbd0ohzdx-Kwmh'}
]

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

app.get('/', function(req,res){
  res.render('landing')
})

app.get('/campgrounds', function(req,res){
  res.render('campgrounds', {campgrounds: campgrounds})
})

app.post('/campgrounds', function(req,res){
  var name = req.body.name
  var image = req.body.image
  var newCamp = {name: name, image: image}
  campgrounds.push(newCamp)
  res.redirect('/campgrounds')
})

app.get('/campgrounds/new', function(req,res){
  res.render('new')
})

app.listen(3000, function(){
  console.log('App running');
})
