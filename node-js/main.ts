import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import path from "path";


const app = express();
app.use(express.json());

app.use(express.static('./public'));

app.use((req, res) => {
    res.status(404);
    res.sendFile(path.resolve('./public/404.html'));
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})