import { LeaderBoardController } from "./LeaderBoardController";
import { LeaderBoardService } from "../services/LeaderBoardService";
import { Knex } from "knex";
import { Request, Response } from 'express';
import { createRequest, createResponse } from "../utils/testing";

describe("Leader Board Controller", () => {
    let leaderBoardController: LeaderBoardController;
    let leaderBoardService: LeaderBoardService;
    let req: Request;
    let res: Response;
    beforeEach(() => {
        leaderBoardService = new LeaderBoardService({} as Knex);
        leaderBoardService.getLeaderBoard = jest.fn(async () => [{
            username: "Duncan",
            score: 1234
        }]);
        leaderBoardService.insertLeaderBoard = jest.fn(async (user: string, score: number) => [
            {
                id: 2
            }
        ]);
        req = createRequest();
        res = createResponse();
        leaderBoardController = new LeaderBoardController(leaderBoardService);
    });

    it('should get leader board details', async () => {
        await leaderBoardController.getBoard(req, res);
        expect(leaderBoardService.getLeaderBoard).toBeCalledTimes(1);
        expect(res.json).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith([{
            username: "Duncan",
            score: 1234
        }]);
    });

    it("should insert leader board details", async () => {
        req = {
            body: {
                user: "testing",
                score: 5432
            }
        } as unknown as Request;
        await leaderBoardController.insertBoard(req, res);
        expect(leaderBoardService.insertLeaderBoard).toBeCalledTimes(1);
        expect(leaderBoardService.insertLeaderBoard).toBeCalledWith("testing", 5432);
        expect(res.json).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith({status: true});
    });
});