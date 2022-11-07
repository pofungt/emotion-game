import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("leaderboard").del();

    // Inserts seed entries
    await knex("leaderboard").insert([ 
        { username: "Bob", score: 1 },
        { username: "Alice", score: 3 },
        { username: "Peter", score: 5 },
        { username: "Ming", score: 7 }
    ]);
};
