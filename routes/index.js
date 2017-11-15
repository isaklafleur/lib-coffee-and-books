const express = require("express");
const router = express.Router();
const CoofeeAndBook = require("../models/coffeeandbook");

// LIST ALL SHOPS
router.get("/", (req, res, next) => {
  CoofeeAndBook.find({}).then(shops => {
    const data = {
      shops: shops
    };
    res.render("shops/index", data);
  });
});

// SHOW NEW FORM
router.get("/new", (req, res) => {
  res.render("shops/new");
});

// CREATE NEW SHOP
router.post("/", (req, res, next) => {
  const shop = {
    name: req.body.name,
    description: req.body.description,
    location: {
      type: "Point",
      coordinates: [req.body.longitude, req.body.latitude]
    },
    business: req.body.business
  };
  const newShop = new CoofeeAndBook(shop);

  newShop.save(error => {
    if (error) {
      next(error);
    } else {
      res.redirect("/");
    }
  });
});

// SHOW ONE SHOP
router.get("/:shopID", (req, res, next) => {
  CoofeeAndBook.findById({ _id: req.params.shopID }).then(shop => {
    const data = {
      shop: shop
    };
    res.render("shops/show", data);
  });
});

// SHOW EDIT FORM
router.get("/:shopID/edit", (req, res, next) => {
  CoofeeAndBook.findOne({ _id: req.params.shopID }).then(shop => {
    const data = {
      shop: shop
    };
    res.render("shops/edit", data);
  });
});

// UPDATE SHOP
router.post("/:shopID", (req, res, next) => {
  const updatedRestaurant = {
    name: req.body.name,
    description: req.body.description,
    location: {
      type: "Point",
      coordinates: [req.body.longitude, req.body.latitude]
    },
    business: req.body.business
  };
  CoofeeAndBook.findOneAndUpdate({ _id: req.params.shopID }, updatedRestaurant).then(() => res.redirect("/"));
});

// DELETE SHOP
router.post("/:shopID/delete", (req, res, next) => {
  CoofeeAndBook.findOneAndRemove({ _id: req.params.shopID }).then(() => res.redirect("/"));
});

module.exports = router;
