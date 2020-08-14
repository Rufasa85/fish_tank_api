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

router.get('/:id', (req, res) => {
    db.Fish.findOne({
        where: {
            id: req.params.id
        }
    }).then(fish => {
        res.json(fish)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})

router.post("/", (req, res) => {
    if (!req.session.user) {
        res.status(401).send("login required")
    }
    else {

        db.Fish.create({
            width: req.body.width,
            name: req.body.name,
            color: req.body.color,
            TankId: req.body.TankId,
            UserId: req.session.user.id
        }).then(newFish => {
            res.json(newFish)
        }).catch(err => {
            console.log(err);
            res.status(500).end()
        })
    }
})

router.put("/:id", (req, res) => {
    db.Fish.findOne({
        where: {
            id: req.params.id
        }
    }).then(fish => {
        if (!req.session.user || fish.UserId !== req.session.user.id) {
            return res.status(401).send('login required/ not your fish')
        } else {
            db.Fish.update({
                width: req.body.width,
                name: req.body.name,
                color: req.body.color,
                TankId:req.body.TankId
            }, {
                where: {
                    id: req.params.id
                }
            }).then(updatedFish => {
                res.json(updatedFish)
            }).catch(err => {
                console.log(err);
                res.status(500).end()
            })
        }
    })
})
router.put("/grow/:id", (req, res) => {
    db.Fish.update({
        width: req.body.width,
    }, {
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
    db.Fish.findOne({
        where: {
            id: req.params.id
        }
    }).then(fish => {
        if (!req.session.user || fish.UserId !== req.session.user.id) {
            return res.status(401).send('login required/ not your fish')
        } else {
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
        }
    })
})

module.exports = router