const express = require("express");
const router = express.Router();
const db = require("../models")
//all routes start with /api/fishes
router.get("/", (req, res) => {
    db.Tank.findAll().then(tanks => {
        res.json(tanks)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})
router.get("/fishes", (req, res) => {
    db.Tank.findAll({include:[db.Fish]}).then(tanks => {
        res.json(tanks)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})

router.get("/:id/fishes",(req,res)=>{
    db.Tank.findOne({
        where:{
            id:req.params.id
        },
        include:[db.Fish]
    }).then(tank=>{
        res.json(tank)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})

router.post("/", (req, res) => {
    if(!req.session.user){
        res.status(401).send("login required")
    }
    else {
        db.Tank.create({
            name:req.body.name,
            UserId:req.session.user.id
        }).then(newTank => {
            res.json(newTank)
        }).catch(err => {
            console.log(err);
            res.status(500).end()
        })
    }
})
//TODO: protect this route
router.put("/:id", (req, res) => {
    db.Tank.update({
        name: req.body.name
    },{
        where: {
            id: req.params.id
        }
    }).then(updatedTank => {
        res.json(updatedTank)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})
//TODO: protect this route
router.delete("/:id", (req, res) => {
    db.Tank.destroy({
        where: {
            id: req.params.id
        }
    }).then(deletedTank => {
        res.json(deletedTank)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})

module.exports = router