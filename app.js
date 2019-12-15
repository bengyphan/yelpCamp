const express       = require("express"),
      app           = express(),
      bodyParser    = require("body-parser"),
      mongoose      = require("mongoose")

mongoose.connect("mongodb://localhost:27017/yelpcamp", { useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP

const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
});

const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Granite Hill",
//         image: "https://source.unsplash.com/Hxs6EAdI2Q8"
//     }, 
//     function(err, campground){
//         if(err){
//             console.log(err)
//         } else {
//             console.log("NEWLY CREATED CAMPGROUND:");
//             console.log(campground);
//         }
//     }
// )
// const campgrounds = [
//     {name: "Salmon Creek"               , image: "https://source.unsplash.com/eJ_OyOeGFHI"},
//     {name: "Granite Hill"               , image: "https://source.unsplash.com/Hxs6EAdI2Q8"},
//     {name: "Mountain Goat's Rest"       , image: "https://source.unsplash.com/iZ4yhyDB-dQ"},
//     {name: "Salmon Creek"               , image: "https://source.unsplash.com/eJ_OyOeGFHI"},
//     {name: "Granite Hill"               , image: "https://source.unsplash.com/Hxs6EAdI2Q8"},
//     {name: "Mountain Goat's Rest"       , image: "https://source.unsplash.com/iZ4yhyDB-dQ"},
// ];

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds", {campgrounds: allCampgrounds});
        }
    })
});

app.post("/campgrounds", function(req,res) {
    // get data from form and add to campgrounds array
    const name = req.body.name;
    const image = req.body.image;
    const newCampground = {name: name, image: image}
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    })
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
})

const port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("The YelpCamp Server Has Started!")
})