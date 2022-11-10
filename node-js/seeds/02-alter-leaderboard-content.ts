import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("leaderboard").del();

    // Inserts seed entries
    await knex("leaderboard").insert([ 
        { username: "Louie Mcdonald", score: 5475 },
        { username: "Nicholas Newman", score: 6749 },
        { username: "David Harrison", score: 8948 },
        { username: "Andrew Black", score: 9032 },
        { username: "Archie Barrett", score: 10742 },
        { username: "Kylen Matthews", score: 2048 },
        { username: "Henry Meyer", score: 3853 },
        { username: "Aydin England", score: 7483 },
        { username: "Raylan Weiss", score: 9473 },
        { username: "Semaj Clarke", score: 15033 },
        { username: "John Lennon", score: 3943 },
    ]);

};
