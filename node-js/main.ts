import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import path from "path";
import Knex from "knex";
import { leaderBoardRoutes } from "./Routes/leaderboardRoute";
import {LeaderBoardController} from "./controllers/LeaderBoardController";
import {LeaderBoardService} from "./services/LeaderBoardService";

const knexConfig = require("./knexfile");
const configMode = process.env.NODE_ENV || "development";
export const knex = Knex(knexConfig[configMode]);

const app = express();
app.use(express.json());

export const leaderBoardService = new LeaderBoardService(knex);
export const leaderBoardController = new LeaderBoardController(leaderBoardService);

app.use('/board',leaderBoardRoutes());

app.use(express.static(path.join(__dirname,'public')));

app.use((req, res) => {
    res.status(404);
    res.sendFile(path.join(__dirname,'public','404.html'));
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})