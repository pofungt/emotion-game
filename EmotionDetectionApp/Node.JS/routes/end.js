const router= require("express").Router()

router.get("/end", (req, res)=> {

    res.render("end")

})

module.exports = router;