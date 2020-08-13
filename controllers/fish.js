const express = require("express");
const router = express.Router();
const db = require("../models")
//all routes start with /api/fishes
router.get("/", (req, res) => {
    db.Fish.findAll().then(fishes => {
        res.json(fishes)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})

router.post("/", (req, res) => {
    db.Fish.create({
        width: req.body.width,
        name: req.body.name,
        color: req.body.color
    }).then(newFish => {
        res.json(newFish)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})

router.put("/feedall", (req, res) => {
    db.Fish.update({
        width: req.body.width
    },{
       
    }).then(updatedFish => {
        res.json(updatedFish)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})
router.put("/:id", (req, res) => {
    db.Fish.update({
        width: req.body.width
    },{
        where: {
            id: req.params.id
        }
    }).then(updatedFish => {
        res.json(updatedFish)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})

router.delete("/:id", (req, res) => {
    db.Fish.destroy({
        where: {
            id: req.params.id
        }
    }).then(deletedFish => {
        res.json(deletedFish)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})

module.exports = router