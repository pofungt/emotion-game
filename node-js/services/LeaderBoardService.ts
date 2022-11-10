import type { Knex } from "knex";

export class LeaderBoardService {
    constructor(private knex: Knex) {}

    async getLeaderBoard() {
        return await this.knex.select('username','score')
                        .from('leaderboard')
                        .orderBy("score",'desc')
                        .limit(10);
    }

    async insertLeaderBoard(user: string, score: number) {
        return await this.knex.insert({
            username: user,
            score: score
        }).into('leaderboard').returning('id');
    }
}