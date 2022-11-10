import { LeaderBoardService } from "../services/LeaderBoardService";
import { Request, Response } from 'express';

export class LeaderBoardController {
    constructor(private leaderBoardService: LeaderBoardService) { }

    getBoard = async (req: Request, res: Response) => {
        try {
            const result = await this.leaderBoardService.getLeaderBoard();
            res.json(result);
        } catch (e) {
            console.log(e)
            res.status(500).json({ msg: '[LBD001]: Failed to get Leader Board' });
        }
    };

    insertBoard = async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const result = await this.leaderBoardService.insertLeaderBoard(data.user, data.score);
            res.json({status: !!result});
        } catch (e) {
            console.log(e);
            res.status(500).json({ msg: '[LBD002]: Failed to insert into Leader Board' });
        }
    }
}