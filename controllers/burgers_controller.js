const express = require("express");
const burger = require("../models/burger");

const router = express.Router();

// home page route, displays all burgers from table
router.get("/", (req, res) => {
  burger.selectAll((data) => {
    const burgerObject = {
      burgers: data
    };
    res.render("index", burgerObject);
  });
});
  
// post route to add burger to table
router.post("/api/burgers", (req, res) => {
  burger.insertOne([
    "burger_name"
  ], [
    req.body.burger_name,
  ], function(result) {
    res.json({ id: result.insertId });
  });
});
  
// put route to update devoured from false to true
router.put("/api/burgers/:id", (req, res) => {
  const condition = `id = ${req.params.id}`;  
  burger.updateOne({
    devoured: true
  }, condition, function(result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
  
// delete route to delete burger from table
router.delete("/api/burgers/:id", (req, res) => {
  const condition = `id = ${req.params.id}`
  burger.delete(condition, (result) => {
      if(result.affectedRows === 0) {
          return res.status(404).end();
      } else {
          res.status(200).end();
      }
  })
});

module.exports = router;