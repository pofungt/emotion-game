import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import http from "http";
import path from "path";


const app = express();
const server = new http.Server(app)

app.use(express.static('./public'));

app.use((req, res) => {
    res.status(404);
    res.sendFile(path.resolve('./public/404.html'));
});

const PORT = 8080;

server.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})