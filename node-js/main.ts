import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import path from "path";
import Knex from "knex";

const knexConfig = require("./knexfile");
const configMode = process.env.NODE_ENV || "development";
// export to pass typescript constraint of unused variable, can remove the export afterwards
export const knex = Knex(knexConfig[configMode]);

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname,'public')));

// knex print out leaderboard
// async function leaderboard(){
//     const board = await knex.select('username','score')
//                     .from('leaderboard')
//                     .orderBy("score",'desc')
//     console.log(board[0])
// }
// leaderboard()

app.use((req, res) => {
    res.status(404);
    res.sendFile(path.join(__dirname,'public','404.html'));
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})