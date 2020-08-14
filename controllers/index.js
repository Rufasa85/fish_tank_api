const express = require("express");
const router = express.Router();
const fishRoutes = require("./fish")
const userRoutes = require("./user")
const tankRoutes = require("./tank")

router.get("/",(req,res)=>{
    res.send("here fishy fishy");
})

router.use("/api/fishes",fishRoutes)
router.use("/api/users",userRoutes)
router.use("/api/tanks",tankRoutes)

module.exports = router