const express = require("express");
const burger = require("../models/burger");

const router = express.Router();

router.get("/", (req, res) => {
    burger.all((data) => {
      const burgerObject = {
        burgers: data
      };
      console.log(burgerObject);
      res.render("index", burgerObject);
    });
  });
  
  router.post("/api/burgers", (req, res) => {
    burger.create([
      "burger_name"
    ], [
      req.body.burger_name,
    ], function(result) {
      // Send back the ID of the new burger
      res.json({ id: result.insertId });
    });
  });
  
  router.put("/api/burgers/:id", (req, res) => {
    const condition = `id = ${req.params.id}`;
  
    console.log("condition", condition);
  
    burger.update({
      devoured: true
    }, condition, function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
  
  router.delete("/api/burgers", (req, res) => {
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