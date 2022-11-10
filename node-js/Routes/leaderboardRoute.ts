import express from 'express';
import { leaderBoardController } from "../main";

export const leaderBoardRoutes = () => {
	const leaderBoardRoutes = express.Router();
	leaderBoardRoutes.get('/board', leaderBoardController.getBoard);
	return leaderBoardRoutes;
};