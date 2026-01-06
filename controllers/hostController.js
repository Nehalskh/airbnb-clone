const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-Home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
    isLoggedIn: req.session.isLoggedIn,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found for editing.");
      return res.redirect("host/host-add-list");
    }
    console.log(homeId, editing, home);
    res.render("host/edit-Home", {
      home: home,
      pageTitle: "Edit your home",
      currentPage: "host-homes",
      editing: editing,
      isLoggedIn: req.session.isLoggedIn,
    });
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
      isLoggedIn: req.session.isLoggedIn,
    });
  });
};

exports.postAddHome = (req, res, next) => {
  // SAVE the home
  const { houseName, price, location, rating, photoUrl, description } =
    req.body;
  const home = new Home({
    houseName,
    price: parseFloat(price),
    location,
    rating,
    photoUrl,
    description,
  });
  home.save().then(() => {
    console.log("Home saved successfully");
  });

  res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl, description, _id } =
    req.body;
  Home.findById(_id).then((home) => {
    home.houseName = houseName;
    home.price = parseFloat(price);
    home.location = location;
    home.rating = rating;
    home.photoUrl = photoUrl;
    home.description = description;
    home
      .save()
      .then((result) => {
        console.log("Home updated successfully", result);
      })
      .catch((error) => {
        console.log("Error while updating home", error);
      });
    res.redirect("/host/host-home-list").catch((error) => {
      console.log("Error while redirecting after update", error);
    });
  });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Came to delete id", homeId);
  Home.findByIdAndDelete(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("Error while deleting", error);
    });
};
