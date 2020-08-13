const express = require("express");
const router = express.Router();
const fishRoutes = require("./fish")
const userRoutes = require("./user")

router.get("/",(req,res)=>{
    res.send("here fishy fishy");
})

router.use("/api/fishes",fishRoutes)
router.use("/api/users",userRoutes)

module.exports = router