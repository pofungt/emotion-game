const router= require("express").Router()

router.get("/play", (req, res)=> {

    res.render("play")

})

module.exports = router;