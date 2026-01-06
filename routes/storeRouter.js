// external modules
const express = require("express");
const storeRouter = express.Router();

// Local module (CONTROLLER - correct place)
const storeController = require("../controllers/storeController");

// Home Page Route
storeRouter.get("/", storeController.getIndex);
storeRouter.get("/homes", storeController.getHomes);
storeRouter.get("/bookings", storeController.getBookings);
storeRouter.get("/favourites", storeController.getFavouriteList);

// Home Details Route
storeRouter.get("/home/:homeId", storeController.getHomeDetails);
//post request handling of favourites
storeRouter.post("/favourites", storeController.postAddToFavourite);
storeRouter.post("/favourites/delete/:homeId", storeController.postRemoveFromFavourite);
module.exports = storeRouter;
