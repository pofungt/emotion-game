import type { Knex } from "knex";

export class LeaderBoardService {
    constructor(private knex: Knex) {}

    async getLeaderBoard() {
        return await this.knex.select('username','score')
                        .from('leaderboard')
                        .orderBy("score",'desc');
    }
}