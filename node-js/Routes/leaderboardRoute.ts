import express from 'express';
import { leaderBoardController } from "../main";

export const leaderBoardRoutes = () => {
	const leaderBoardRoutes = express.Router();

	leaderBoardRoutes.get('/', leaderBoardController.getBoard);
  leaderBoardRoutes.post('/', leaderBoardController.insertBoard);

	return leaderBoardRoutes;
};