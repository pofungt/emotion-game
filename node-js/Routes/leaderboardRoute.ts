import express from 'express';
import { knex } from '../main';

export const leaderBoardRoute = express.Router();

leaderBoardRoute.get("/board", async (req,res) => {
    const board = await knex.select('username','score')
                    .from('leaderboard')
                    .orderBy("score",'desc')
  res.json(board);
})