const express = require("express");
const router = express.Router();
const db = require("../models")
const bcrypt = require('bcrypt');

router.post('/signup',(req,res)=>{
    db.User.create({
        name:req.body.name,
        password:req.body.password,
        email:req.body.email
    }).then(newUser=>{
        res.json(newUser)
    }).catch(err=>{
        console.log(err);
        res.status(500).end()
    })
})
router.post('/login',(req,res)=>{
    db.User.findOne({
        where:{
            email:req.body.email
        }
    }).then(user=>{
       if(!user){
           res.status(404).send("no such user");
       }else {
        if(bcrypt.compareSync(req.body.password,user.password)){
            req.session.user = {
                name:user.name,
                email:user.email,
                id:user.id
            }
            res.json(req.session);
        } else {
            res.status(401).send("wrong password")
        }
       }
    }).catch(err=>{
        console.log(err);
        res.status(500).end()
    })
})

router.get('/readsessions',(req,res)=>{
    res.json(req.session);
})

module.exports = router;