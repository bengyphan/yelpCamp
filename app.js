const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    const campgrounds = [
        {name: "Salmon Creek", image: "https://images.pexels.com/photos/756780/pexels-photo-756780.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
        {name: "Granite Hill", image: "https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"},
        {name: "Mountain Goat's Rest", image: "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"}
    ]

    res.render("campgrounds", {campgrounds: campgrounds});
});

const port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("The YelpCamp Server Has Started!")
})