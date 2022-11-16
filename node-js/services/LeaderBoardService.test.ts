import { LeaderBoardService } from "./LeaderBoardService";
import Knex from "knex";

const knexConfig = require("../knexfile");
const knex = Knex(knexConfig["test"]);

describe("Leader Board Service", () => {
    let leaderBoardService: LeaderBoardService;
    let playerId: number;

    beforeAll(async () => {
        leaderBoardService = new LeaderBoardService(knex);
        playerId = (await knex.insert({
            username: "testing",
            score: 1000000
        }).into("leaderboard").returning("id"))[0].id;
    });

    it('should get result from leader board', async () => {
        const result = await leaderBoardService.getLeaderBoard();
        expect(result).toMatchObject([{
            username: "testing",
            score: 1000000
        }]);
    });

    it('should insert into leader board', async () => {
        const newUserId = (await leaderBoardService.insertLeaderBoard("testing again", 1234))[0].id;
        const insertedResult = await knex.select('*').from('leaderboard').where("id", newUserId);
        expect(insertedResult.length).toBe(1);
        expect(insertedResult).toMatchObject([{
            username: "testing again",
            score: 1234
        }]);
        await knex("leaderboard").where("id", newUserId).del();
    });

    afterAll(async () => {
        await knex("leaderboard").where("id", playerId).del();
        await knex.destroy();
    })
});