const express = require("express");
const router = express.Router();
const fishRoutes = require("./fish")

router.get("/",(req,res)=>{
    res.send("here fishy fishy");
})

router.use("/api/fishes",fishRoutes)

module.exports = router