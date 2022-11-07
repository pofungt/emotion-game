const express = require('express');

const app = express();
const port=process.env.PORT|| 5000;

//middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.set("view engine","ejs")

//routes
app.use(require("./routes/index"))
app.use(require("./routes/play"))
app.use(require("./routes/end"))

//server configurations
app.listen(port, () => console.log(`Web Application running on port ${port}`));



